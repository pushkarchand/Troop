const { ProjectModel } = require("../models");

//Dealing with data base operations
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

  async ProjectDetails({ id }) {
    const project = await ProjectModel.findById(id).populate('Section');
    return project;
  }

  async FinduserById({ id }) {
    const project = await ProjectModel.findById(id);
    return project;
  }
}

module.exports = ProjectRepository;
