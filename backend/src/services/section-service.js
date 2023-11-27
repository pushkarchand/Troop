const { Types } = require("mongoose");
const { SectionRepository, ProjectRepository } = require("../database");
const { FormateData } = require("../utils");
// All Business logic will be here
class SectionService {
  constructor() {
    this.repository = new SectionRepository();
    this.projectrepository = new ProjectRepository();
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
    const deletedSection = await this.repository.DeleteSection(id);
    return FormateData(deletedSection);
  }
}

module.exports = SectionService;
