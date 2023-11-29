const {
  ProjectRepository,
  SectionRepository,
  PageRepository,
  SubPageRepository,
  ContentRepository,
} = require("../database");
const { FormateData } = require("../utils");
// All Business logic will be here
class ProjectService {
  constructor() {
    this.repository = new ProjectRepository();
    this.sectionRepository = new SectionRepository();
    this.pageRepository = new PageRepository();
    this.subPageRepository = new SubPageRepository();
    this.contentRepository = new ContentRepository();
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
    const { id, name, description, sections } = projectInputs;

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
    const project = await this.repository.FetchProjectById(id);
    if (!project) {
      return FormateData({ code: "PROJECT_NOT_FOUND" });
    }

    const sections = [];
    const pages = [];
    const subPages = [];
    project.sections.forEach((section) => {
      sections.push(section._id);
      section.pages.forEach((page) => {
        pages.push(page._id);
        page.subPages.forEach((subPage) => {
          subPages.push(subPage._id);
        });
      });
    });
    if (subPages.length > 0) {
      // Delete subPages and it's content
      await this.contentRepository.DeleteMany(subPagesIds);
      await this.pageRepository.DeleteMany(subPagesIds);
    }

    // Delete pages
    await this.pageRepository.DeleteMany(pages);

    // Delete sections
    await this.sectionRepository.DeleteMany(sections);

    // Finally, delete the project
    const deletedProject = await this.repository.DeleteProject({ _id: project._id });
    console.log("Delete Project", sections, pages, subPages);
    return FormateData(deletedProject);
  }
  catch(error) {
    console.error("Error during deletion:", error);
  }
}

module.exports = ProjectService;
