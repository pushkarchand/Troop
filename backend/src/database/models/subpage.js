const mongoose = require("mongoose");
const shortid = require("shortid");

const subPageSchema = new mongoose.Schema(
  {
    localId: {
      type: String,
      default: shortid.generate,
      unique: true,
    },
    name: String,
    tooltip: String,
    order: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    publishedOn: Date,
    isDefault: Boolean,
    pageId: { type: mongoose.Schema.Types.ObjectId, ref: "Page" },
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

const SubpageModel = mongoose.model("SubPage", subPageSchema);
module.exports = SubpageModel;
