const mongoose = require("mongoose");
const shortid = require("shortid");
const ProjectSchema = new mongoose.Schema(
  {
    localId: {
      type: String,
      default: shortid.generate,
      unique: true,
    },
    name: String,
    description: String,
    avatar: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    sections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section" }],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__$;
        delete ret.__v;
        delete ret.$isNew;
      },
    },
    timestamps: true,
  }
);

const ProjectModel = mongoose.model("Project", ProjectSchema);
module.exports = ProjectModel;
