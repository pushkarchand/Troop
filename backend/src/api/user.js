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
      console.log(`/signup : ${error}`);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { data } = await service.SignIn({ email, password });

      res.json(data);
    } catch (error) {
      console.log(`/signup : ${error}`);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/profile/:id", UserAuth, async (req, res, next) => {
    try {
      const id = req.params.id;
      const { data } = await service.GetProfile(id);
      res.json(data);
    } catch (error) {
      console.log(`/profile : ${error}`);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/users/:id", UserAuth, async (req, res, next) => {
    try {
      const id = req.params.id;
      const { data } = await service.DeleteUser(id);
      res.json(data);
    } catch (error) {
      console.log(`/profile : ${error}`);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/users", UserAuth, async (req, res) => {
    try {
      const { firstName, lastName, email, type, id } = req.body;
      const { data } = await service.UpdateUser({
        firstName,
        lastName,
        email,
        type,
        id,
      });
      res.json(data);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/users", UserAuth, async (req, res, next) => {
    try {
      const { data } = await service.GetUsers();
      res.json(data);
    } catch (error) {
      console.log(`/profile : ${error}`);
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
