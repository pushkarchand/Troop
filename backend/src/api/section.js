const SectionService = require("../services/section-service");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const service = new SectionService();

  app.post("/api/sections", UserAuth, async (req, res) => {
    try {
      const { name, description, projectId } = req.body;
      const { data } = await service.createSection({
        name,
        description,
        projectId,
        pages: [],
      });
      res.json(data);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/sections", UserAuth, async (req, res) => {
    try {
      const { id, name, description, pages } = req.body;
      const { data } = await service.updateSection({
        id,
        name,
        description,
        pages,
      });
      res.json(data);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/sections", UserAuth, async (req, res, next) => {
    try {
      const { data } = await service.findAllSections();
      res.json(data);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/sections/:id", UserAuth, async (req, res, next) => {
    try {
      const sectionId = req.params.id;
      const { data } = await service.findSectionById(sectionId);
      res.json(data);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/sections/:id", UserAuth, async (req, res, next) => {
    try {
      const sectionId = req.params.id;
      const { data } = await service.deleteSection(sectionId);
      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};
