const mongoose = require("mongoose");
const shortid = require("shortid");
const sectionSchema = new mongoose.Schema(
  {
    localId: {
      type: String,
      default: shortid.generate,
      unique: true,
    },
    name: String,
    description: String,
    order: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    pages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Page' }],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.$isNew;
      },
    },
    timestamps: true,
  }
);

const SectionModel = mongoose.model("Section", sectionSchema);
module.exports = SectionModel;
