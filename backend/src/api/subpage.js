const SubPageService = require("../services/subpage-service");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const service = new SubPageService();

  app.post("/api/subpages", async (req, res) => {
    try {
      const { name, tooltip, pageId } = req.body;
      const { data } = await service.createSubPage({
        name,
        tooltip,
        pageId,
      });
      res.json(data);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/subpages", async (req, res) => {
    try {
      const { id, name, tooltip, order } = req.body;
      const { data } = await service.updateSubPage({
        id,
        name,
        tooltip,
      });
      res.json(data);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/subpages", async (req, res, next) => {
    try {
      const { data } = await service.findAllSubPages();
      res.json(data);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/subpages/:id", async (req, res, next) => {
    try {
      const pageId = req.params.id;
      const { data } = await service.findSubPageById(pageId);
      res.json(data);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/subpages/:id", async (req, res, next) => {
    try {
      const pageId = req.params.id;
      const { data } = await service.deleteSubPage(pageId);
      res.json(data);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};
