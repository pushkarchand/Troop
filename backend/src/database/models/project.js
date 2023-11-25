const mongoose = require("mongoose");
const ProjectSchema = new mongoose.Schema({
  name: String,
  description: String,
  avatar: String,
  createdBy: String,
  createdAt: { type: Date, default: Date.now },
  sections: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section" }], default: [] },
});

const ProjectModel = mongoose.model("Project", ProjectSchema);
module.exports =  ProjectModel
