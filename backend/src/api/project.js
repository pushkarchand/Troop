const ProjectService = require("../services/project-service");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const service = new ProjectService();

  app.post("/api/projects", UserAuth, async (req, res) => {
    try {
      const { name, description } = req.body;
      const { data } = await service.CreateProject({
        name,
        description,
      });
      res.json(data);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/projects", UserAuth, async (req, res) => {
    try {
      const { id, name, description, sections } = req.body;
      const { data } = await service.updateProject({
        id,
        name,
        description,
        sections,
      });
      res.json(data);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/projects", UserAuth, async (req, res, next) => {
    try {
      const { data } = await service.findAllProjects();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/projects/:id", UserAuth, async (req, res, next) => {
    try {
      const projectId = req.params.id;
      const { data } = await service.findProjectById(projectId);
      res.json(data);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/projects/:id", UserAuth, async (req, res, next) => {
    try {
      const projectId = req.params.id;
      const { data } = await service.deleteProject(projectId);
      res.json(data);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};
