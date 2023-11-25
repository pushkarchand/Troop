const mongoose = require("mongoose");

const subPageSchema = new mongoose.Schema({
  name: String,
  tooltip: String,
  order: Number,
  createdBy: String,
  publishedOn: Date,
  createdOn: { type: Date, default: Date.now },
  isDefault: Boolean,
  content: { type: mongoose.Schema.Types.ObjectId, ref: "Content", default: null },
});

const SubpageModel = mongoose.model("SubPage", subPageSchema);
module.exports = SubpageModel;
