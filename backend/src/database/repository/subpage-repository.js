const { SubPageModel } = require("../models");

class SubPageRepository {
  async CreateSubPage({ name, tooltip, pageId, user }) {
    const subPage = new SubPageModel({
      name,
      tooltip,
      pageId,
      user,
    });

    const subPageResult = await subPage.save();
    return subPageResult;
  }

  async UpdateSubPage({ id, name, tooltip, publishedOn, order }) {
    const updateObject = { name, tooltip, publishedOn, order };
    const updatedSubPage = await SubPageModel.findOneAndUpdate({ localId: id }, { ...updateObject }, { new: true });
    return updatedSubPage;
  }

  async SubPageDetails(id) {
    const subPage = await SubPageModel.findOne({ localId: id });
    return subPage;
  }

  async FetchSubPages() {
    const subPages = await SubPageModel.find({});
    return subPages;
  }

  async DeleteSubPage(id) {
    const deletedSubPage = await SubPageModel.findByIdAndDelete(id);
    return deletedSubPage;
  }
}

module.exports = SubPageRepository;