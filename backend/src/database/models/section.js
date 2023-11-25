const mongoose = require("mongoose");
const sectionSchema = new mongoose.Schema({
  name: String,
  description: String,
  order: Number,
  createdBy: String,
  pages: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Page" }], default: [] },
});

const SectionModel = mongoose.model("Section", sectionSchema);
module.exports = SectionModel;
