const { ContentRepository } = require("../database");
const { FormateData } = require("../utils");
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
    return FormateData(content);
  }
}

module.exports = ContentSevice;
