const { SubPageRepository, PageRepository, ContentRepository } = require("../database");
const { FormateData } = require("../utils");
// All Business logic will be here
class SubPageSevice {
  constructor() {
    this.repository = new SubPageRepository();
    this.pageRepository = new PageRepository();
    this.contentRepository = new ContentRepository();
  }

  async createSubPage(subPageInputs) {
    const { name, tooltip, pageId } = subPageInputs;

    const subPage = await this.repository.CreateSubPage({
      name,
      tooltip,
      pageId,
    });
    const PageDetails = await this.pageRepository.FetchPageById(pageId);
    PageDetails.subPages.push(subPage._id);
    await this.pageRepository.UpdatePage({
      id: PageDetails.localId,
      name: PageDetails.name,
      description: PageDetails.description,
      subPages: PageDetails.subPages,
    });

    return FormateData({ ...subPage });
  }

  async updateSubPage(subPageInputs) {
    const { id, name, tooltip, publishedOn, order } = subPageInputs;

    const subPage = await this.repository.UpdateSubPage({
      id,
      name,
      tooltip,
      publishedOn,
      order,
    });

    return FormateData({ ...subPage });
  }

  async findAllSubPages() {
    const subPages = await this.repository.FetchSubPages();
    return FormateData(subPages);
  }

  async findSubPageById(id) {
    await this.contentRepository.DeleteMany([id]);
    const subPage = await this.repository.DeleteSubPage(id);

    return FormateData(subPage);
  }
}

module.exports = SubPageSevice;
