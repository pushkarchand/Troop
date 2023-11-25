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

    return FormateData({ ...project  });
  }

  async GetProfile(id) {
    const existingCustomer = await this.repository.FinduserById({ id });
    return FormateData(existingCustomer);
  }
}

module.exports = ProjectService;
