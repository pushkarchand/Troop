const { Types } = require("mongoose");
const {
  SectionRepository,
  ProjectRepository,
  PageRepository,
  SubPageRepository,
  ContentRepository,
} = require("../database");
const { FormateData } = require("../utils");
// All Business logic will be here
class SectionService {
  constructor() {
    this.repository = new SectionRepository();
    this.projectrepository = new ProjectRepository();
    this.pageRepository = new PageRepository();
    this.subPageRepository = new SubPageRepository();
    this.contentRepository = new ContentRepository();
  }

  async createSection(pageInputs) {
    const { name, description, projectId, pages } = pageInputs;

    const section = await this.repository.CreateSection({
      name,
      description,
      projectId,
      pages,
    });
    const project = await this.projectrepository.FetchProjectById(projectId);
    project.sections.push(section._id);
    await this.projectrepository.UpdateProject({
      id: project.localId,
      name: project.name,
      description: project.description,
      sections: project.sections,
    });

    return FormateData({ ...section });
  }

  async updateSection(pageInputs) {
    const { id, name, description, pages } = pageInputs;

    const updatedSection = await this.repository.UpdateSection({
      id,
      name,
      description,
      pages,
    });

    return FormateData({ ...updatedSection._doc });
  }

  async findAllSections() {
    const sections = await this.repository.FetchSections();
    return FormateData(sections);
  }

  async findSectionById(id) {
    const section = await this.repository.SectionDetails(id);
    return FormateData(section);
  }

  async deleteSection(id) {
    const section = await this.repository.FetchSectionById(id);
    if (!section) {
      return FormateData({ code: "SECTION_NOT_FOUND" });
    }
    const pages = [];
    const subPages = [];
    section.pages.forEach((page) => {
      pages.push(page._id);
      page.subPages.forEach((subPage) => {
        subPages.push(subPage._id);
      });
    });
    if (subPages.length > 0) {
      // Delete subPages and it's content
      await this.contentRepository.DeleteMany(subPagesIds);
      await this.pageRepository.DeleteMany(subPagesIds);
    }

    // Delete pages
    await this.pageRepository.DeleteMany(pages);
    await this.repository.DeleteSection(id);
    return FormateData(deletedSection);
  }
}

module.exports = SectionService;
