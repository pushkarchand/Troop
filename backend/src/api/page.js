const PageService = require("../services/page-service");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const service = new PageService();

  app.post("/api/pages", UserAuth, async (req, res) => {
    try {
      const { name, description, sectionId } = req.body;
      const { data } = await service.createPage({
        name,
        description,
        sectionId,
      });
      res.json(data);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/pages", UserAuth, async (req, res) => {
    try {
      const { id, name, description, subPages } = req.body;
      const { data } = await service.updatePage({
        id,
        name,
        description,
        subPages,
      });
      res.json(data);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/pages", UserAuth, async (req, res, next) => {
    try {
      const { data } = await service.findAllPages();
      res.json(data);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/pages/:id", UserAuth, async (req, res, next) => {
    try {
      const pageId = req.params.id;
      const { data } = await service.findPageById(pageId);
      res.json(data);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/pages/:id", UserAuth, async (req, res, next) => {
    try {
      const pageId = req.params.id;
      const { data } = await service.deletePage(pageId);
      res.json(data);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};
