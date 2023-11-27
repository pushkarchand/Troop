const { ContentRepository } = require("../database");
const { FormateData } = require("../utils");
const { getObjectSignedUrl } = require("../utils/upload");
// All Business logic will be here
class ContentSevice {
  constructor() {
    this.repository = new ContentRepository();
  }

  async createContent(contentInputs) {
    const { data, subPageId } = contentInputs;

    const content = await this.repository.CreateContent({
      data,
      subPageId,
    });

    return FormateData({ ...content });
  }

  async updateContent(contentInputs) {
    const { id, data } = contentInputs;

    const content = await this.repository.UpdateContent({
      id,
      data,
    });

    return FormateData({ ...content });
  }

  async contentDetailsOnSubPageId(id) {
    const content = await this.repository.ContentDetailsOnSubPageId(id);
    console.log("content", content);
    const targetData = [];
    await Promise.all(
      content.data.blocks.map(async (item) => {
        if (item.type === "image") {
          const url = await getObjectSignedUrl(item.data.file.imageName);
          targetData.push({
            ...item,
            data: {
              ...item.data,
              file: {
                ...item.data.file,
                url: url,
              },
            },
          });
        } else {
          targetData.push({ ...item });
        }
      })
    );
    return FormateData({ ...content, data: { ...content.data, blocks: targetData } });
  }
}

module.exports = ContentSevice;
