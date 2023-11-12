const UsererService = require("../services/user-service");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const service = new UsererService();

  app.post("/signup", async (req, res, next) => {
    try {
      const { email, password, phone, firstName, lastName, type } = req.body;
      const { data } = await service.SignUp({
        email,
        password,
        phone,
        firstName,
        lastName,
        type,
      });
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const { data } = await service.SignIn({ email, password });

      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/profile", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data } = await service.GetProfile({ _id });
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/whoami", (req, res, next) => {
    try {
      return res.status(200).json({ msg: "/Troop : I am Troop backend Service" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
};
