const express = require("express");
const cors = require("cors");
const { user, upload, project, section, page, subpage, content } = require("./api");

module.exports = async (app) => {
  app.use(express.json());
  app.use(cors());
  app.use(express.static(__dirname + "/public"));
  user(app);
  upload(app);
  project(app);
  section(app);
  page(app);
  subpage(app);
  content(app);
};
