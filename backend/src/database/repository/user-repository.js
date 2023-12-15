const mongoose = require("mongoose");
const { UserModel } = require("../models");

//Dealing with data base operations
class UserRepository {
  async CreateUser({ email, password, phone, salt, firstName, lastName, type }) {
    const user = new UserModel({
      email,
      password,
      salt,
      phone,
      firstName,
      lastName,
      type,
      address: [],
    });

    const userResult = await user.save();
    return userResult;
  }

  async Finduser(email) {
    const existingUser = await UserModel.findOne({ email: email });
    return existingUser;
  }

  async FinduserById(id) {
    const existingUser = await UserModel.findById(id);
    return existingUser;
  }

  async DeleteById(id) {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    return deletedUser;
  }

  async UpdateUserById({ firstName, lastName, email, type, id }) {
    const updatedPage = await UserModel.findByIdAndUpdate(id, { firstName, lastName, email, type }, { new: true });
    return updatedPage;
  }

  async FetchUsers() {
    const users = await UserModel.find({});
    return users;
  }
}

module.exports = UserRepository;
