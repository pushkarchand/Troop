const mongoose = require("mongoose");
const shortid = require("shortid");
const contentSchema = new mongoose.Schema(
  {
    localId: {
      type: String,
      default: shortid.generate,
      unique: true,
    },
    subPageId: { type: mongoose.Schema.Types.ObjectId, ref: "SubPage" },
    data: {
      time: { type: Number, default: Date.now, required: true },
      blocks: [Object],
      version: { type: String },
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

const ContentModel = mongoose.model("Content", contentSchema);
module.exports = ContentModel;
