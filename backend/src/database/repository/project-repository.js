const { ProjectModel } = require("../models");

class ProjectRepository {
  async CreateProject({ name, description, avatar, createdBy }) {
    const project = new ProjectModel({
      name,
      description,
      avatar,
      createdBy,
      sections: [],
    });

    const ProjectResult = await project.save();
    return ProjectResult;
  }

  async UpdateProject({ id, name, description, sections }) {
    const updatedProject = await ProjectModel.findByIdAndUpdate(id, { name, description, sections }, { new: true });

    return updatedProject;
  }

  async FetchProjectById(id) {
    const project = await ProjectModel.findById(id)
      .populate({
        path: "sections",
        model: "Section",
        populate: {
          path: "pages",
          model: "Page",
          populate: {
            path: "subPages",
            model: "SubPage",
          },
        },
      })
      .exec();
    return project;
  }

  async ProjectDetails(id) {
    const project = await ProjectModel.findOne({ localId: id })
      .populate({
        path: "sections",
        model: "Section",
        populate: {
          path: "pages",
          model: "Page",
          populate: {
            path: "subPages",
            model: "SubPage",
          },
        },
      })
      .exec();
    return project;
  }

  async FetchProjects() {
    const projects = await ProjectModel.find({})
      .populate({
        path: "sections",
        model: "Section",
        populate: {
          path: "pages",
          model: "Page",
          populate: {
            path: "subPages",
            model: "SubPage",
          },
        },
      })
      .exec();
    return projects;
  }

  async DeleteProject(id) {
    const deletedProject = await ProjectModel.findOneAndDelete(id);
    return deletedProject;
  }
}

module.exports = ProjectRepository;
