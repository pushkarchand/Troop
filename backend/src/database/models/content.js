const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  time: { type: Number, required: true },
  blocks: [Object], // Embed the Block schema as an array
  version: { type: String, required: true },
});

const ContentModel = mongoose.model("Content", contentSchema);
module.exports = ContentModel
