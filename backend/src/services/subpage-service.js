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
    const data = {
      time: new Date().getTime(),
      blocks: [],
      version: "1",
    };
    await this.contentRepository.CreateContent({ data, subPageId: subPage._id });
    const PageDetails = await this.pageRepository.FetchPageById(pageId);
    PageDetails.subPages.push(subPage._id);
    const updatedPage = await this.pageRepository.UpdatePage({
      id: PageDetails._id,
      name: PageDetails.name,
      description: PageDetails.description,
      subPages: PageDetails.subPages,
    });

    return FormateData({ ...subPage });
  }

  async updateSubPage(subPageInputs) {
    const { id, name, tooltip } = subPageInputs;

    const subPage = await this.repository.UpdateSubPage({
      id,
      name,
      tooltip,
    });

    return FormateData({ ...subPage });
  }

  async findAllSubPages() {
    const subPages = await this.repository.FetchSubPages();
    return FormateData(subPages);
  }

  async findSubPageById(id) {
    const subPage = await this.repository.SubPageDetails([id]);

    return FormateData(subPage);
  }

  async deleteSubPage(id) {
    await this.contentRepository.DeleteMany([id]);
    const subPage = await this.repository.DeleteSubPage(id);
    return FormateData(subPage);
  }
}

module.exports = SubPageSevice;
