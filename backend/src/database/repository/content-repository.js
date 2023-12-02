const { ContentModel } = require("../models");

class ContentRepository {
  async CreateContent({ data, subPageId }) {
    const content = new ContentModel({
      data,
      subPageId,
    });

    const contentResult = await content.save();
    return contentResult;
  }

  async UpdateContent({ id, data }) {
    const updatedContent = await ContentModel.findByIdAndUpdate(id, { data }, { new: true });
    return updatedContent;
  }

  async ContentDetailsOnSubPageId(subPageId) {
    const content = await ContentModel.findOne({ subPageId: subPageId }).lean();
    return content;
  }

  async FetchContents() {
    const contents = await ContentModel.find({});
    return contents;
  }

  async DeleteContent(id) {
    const deletedContent = await ContentModel.findByIdAndDelete(id);
    return deletedContent;
  }

  async DeleteMany(ids) {
    const deletedContent = await ContentModel.deleteMany({ subPageId: { $in: ids } });
    return deletedContent;
  }
}

module.exports = ContentRepository;
