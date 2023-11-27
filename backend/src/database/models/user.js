const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const shortid = require("shortid");
const UserSchema = new Schema(
  {
    localId: {
      type: String,
      default: shortid.generate,
      unique: true,
    },
    email: String,
    password: String,
    salt: String,
    phone: String,
    firstName: String,
    lastName: String,
    type: String,
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);
