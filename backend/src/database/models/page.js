const mongoose = require("mongoose");
const shortid = require("shortid");
const pageSchema = new mongoose.Schema(
  {
    localId: {
      type: String,
      default: shortid.generate,
      unique: true,
    },
    name: String,
    description: String,
    order: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Section" },
    subPages: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubPage" }],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__$;
        delete doc.__v;
        delete ret.$isNew;
      },
    },
    timestamps: true,
  }
);

const PageModel = mongoose.model("Page", pageSchema);
module.exports = PageModel;
