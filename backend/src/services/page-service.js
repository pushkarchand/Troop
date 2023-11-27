const { PageRepository, SectionRepository } = require("../database");
const { FormateData } = require("../utils");
// All Business logic will be here
class PageSevice {
  constructor() {
    this.repository = new PageRepository();
    this.sectionRespository = new SectionRepository();
  }

  async createPage(pageInputs) {
    const { name, description, sectionId } = pageInputs;

    const page = await this.repository.CreatePage({
      name,
      description,
      sectionId,
    });
    const sectionDetails = await this.sectionRespository.FetchSectionById(sectionId);
    sectionDetails.pages.push(page._id);
    await this.sectionRespository.UpdateSection({
      id: sectionDetails.localId,
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
    const page = await this.repository.DeletePage(id);
    return FormateData(page);
  }
}

module.exports = PageSevice;
