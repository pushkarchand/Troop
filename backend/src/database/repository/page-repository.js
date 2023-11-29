const { PageModel } = require("../models");

class PageRepository {
  async CreatePage({ name, description, sectionId, user = null }) {
    const page = new PageModel({
      name,
      description,
      sectionId,
      user,
      subPages: [],
    });

    const pageResult = await page.save();
    return pageResult;
  }

  async UpdatePage({ id, name, description, subPages }) {
    const updatedPage = await PageModel.findOneAndUpdate(
      { localId: id },
      { name, description, subPages },
      { new: true }
    );
    return updatedPage;
  }

  async PageDetails(id) {
    const page = await PageModel.findOne({ localId: id }).populate("SubPage").exec();
    return page;
  }

  async FetchPageById(id) {
    const page = await PageModel.findById(id);
    return page;
  }

  async Fetchpages() {
    const pages = await PageModel.find({});
    return pages;
  }

  async DeletePage(id) {
    const deletedPage = await PageModel.findByIdAndDelete(id).populate('subpage').exec();
    return deletedPage;
  }

  async DeleteMany(ids){
    const deletedPages= await PageModel.deleteMany({ _id: { $in: ids} });
    return deletedPages
  }
}

module.exports = PageRepository;
