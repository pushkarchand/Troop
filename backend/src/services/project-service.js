const { ProjectRepository } = require("../database");
const { FormateData } = require("../utils");
// All Business logic will be here
class ProjectService {
  constructor() {
    this.repository = new ProjectRepository();
  }

  async CreateProject(projectInputs) {
    const { name, description } = projectInputs;

    const project = await this.repository.CreateProject({
      name,
      description,
    });

    return FormateData({ ...project._doc });
  }

  async updateProject(projectInputs) {
    const {id, name, description, sections } = projectInputs;

    const project = await this.repository.UpdateProject({
      id,
      name,
      description,
      sections,
    });

    return FormateData({ ...project });
  }

  async findAllProjects() {
    const projects = await this.repository.FetchProjects();
    return FormateData(projects);
  }

  async findProjectById(id) {
    const projects = await this.repository.ProjectDetails(id);
    return FormateData(projects);
  }

  async deleteProject(id) {
    const projects = await this.repository.DeleteProject(id);
    return FormateData(projects);
  }
}

module.exports = ProjectService;
