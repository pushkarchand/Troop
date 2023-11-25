const mongoose = require("mongoose");
const pageSchema = new mongoose.Schema({
  name: String,
  description: String,
  order: Number,
  createdBy: String,
  subPages: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubPage" }],
});

const PageModel = mongoose.model("Page", pageSchema);
module.exports = PageModel;
