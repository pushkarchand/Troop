const ProjectService = require("../services/project-service");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const service = new ProjectService();

  app.post("/project", async (req, res) => {
    try {
      const { name, description } = req.body;
      const { data } = await service.CreateProject({
        name,
        description,
      });
      res.json(data);
    } catch (error) {
      console.log("error", error)
      res.status(500).json({ message: "Internal server error" });
    }
  });
};
