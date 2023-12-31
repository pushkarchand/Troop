const SubPageService = require("./subpage-service");
const { PageRepository, SectionRepository, SubPageRepository, ContentRepository } = require("../database");
const { FormateData } = require("../utils");
// All Business logic will be here
class PageSevice {
  constructor() {
    this.repository = new PageRepository();
    this.sectionRespository = new SectionRepository();
    this.subPageRepository = new SubPageRepository();
    this.contentRepository = new ContentRepository();
    this.subPageService = new SubPageService();
  }

  async createPage(pageInputs) {
    const { name, description, sectionId } = pageInputs;

    const page = await this.repository.CreatePage({
      name,
      description,
      sectionId,
    });

    const sectionDetails = await this.sectionRespository.FetchSectionById(sectionId);
    await this.subPageService.createSubPage({ name: "Implementation", tooltip: "Implementation", pageId: page._id }),
      sectionDetails.pages.push(page._id);
    await this.sectionRespository.UpdateSection({
      id: sectionDetails._id,
      name: sectionDetails.name,
      description: sectionDetails.description,
      pages: sectionDetails.pages,
    });

    return FormateData({ ...page });
  }

  async updatePage(pageInputs) {
    const { id, name, description, subPages } = pageInputs;

    const page = await this.repository.UpdatePage({
      id,
      name,
      description,
      subPages,
    });

    return FormateData({ ...page });
  }

  async findAllPages() {
    const pages = await this.repository.Fetchpages();
    return FormateData(pages);
  }

  async findPageById(id) {
    const page = await this.repository.PageDetails(id);
    return FormateData(page);
  }

  async deletePage(id) {
    const page = await this.repository.FetchPageById(id);
    if (!page) {
      return FormateData({ code: "PAGE_NOT_FOUND" });
    }
    const subPages = [];
    page.subPages.forEach((subPage) => {
      subPages.push(subPage._id);
    });
    if (subPages.length > 0) {
      // Delete subPages and it's content
      await this.contentRepository.DeleteMany(subPages);
      await this.subPageRepository.DeleteMany(subPages);
    }
    await this.repository.DeletePage(id);
    return FormateData(page);
  }
}

module.exports = PageSevice;
