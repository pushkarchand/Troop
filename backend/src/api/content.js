const ContentService = require("../services/content-service");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const service = new ContentService();

  app.post("/api/contents", async (req, res) => {
    try {
      const { data, subPageId } = req.body;
      const mainData = await service.createContent({
        data,
        subPageId,
      });
      res.json(mainData.data);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Internal server error" });
    } 
  });

  app.put("/api/contents", async (req, res) => {
    try {
      const { data, id } = req.body;
      const mainData = await service.updateContent({
        data,
        id,
      });
      res.json(mainData.data);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


  app.get("/api/contents/:id", async (req, res, next) => {
    try {
      const contentId = req.params.id;
      const { data } = await service.contentDetailsOnSubPageId(contentId);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
};
