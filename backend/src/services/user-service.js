const { UserRepository } = require("../database");
const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require("../utils");

// All Business logic will be here
class CustomerService {
  constructor() {
    this.repository = new UserRepository();
  }

  async SignIn(userInputs) {
    const { email, password } = userInputs;

    const existingCustomer = await this.repository.Finduser(email);
    if (existingCustomer) {
      const validPassword = await ValidatePassword(password, existingCustomer.password, existingCustomer.salt);
      if (validPassword) {
        const token = await GenerateSignature({
          email: existingCustomer.email,
          _id: existingCustomer._id,
          type: existingCustomer.type,
          name: `${existingCustomer.firstName} ${existingCustomer.lastName}`,
        });
        return FormateData({ id: existingCustomer._id, token });
      }
    }

    return FormateData({ code: "INVALID_CREDENTIALS" });
  }

  async SignUp(userInputs) {
    const { email, password, phone, firstName, lastName, type } = userInputs;
    const existingCustomer = await this.repository.Finduser(email);
    if (!existingCustomer) {
      // create salt
      let salt = await GenerateSalt();

      let userPassword = await GeneratePassword(password, salt);

      const customer = await this.repository.CreateUser({
        email,
        password: userPassword,
        phone,
        salt,
        firstName,
        lastName,
        type,
      });
      const token = await GenerateSignature({
        email: email,
        _id: customer._id,
        localId: customer.localId,
        type: customer.type,
        name: `${customer.firstName} ${customer.lastName}`,
      });
      return FormateData({ _id: customer._id, localId: customer.localId, token });
    } else {
      return FormateData({ code: "USER_EXISTS" });
    }
  }

  async GetProfile(id) {
    const existingCustomer = await this.repository.FinduserById(id);
    return FormateData(existingCustomer);
  }

  async DeleteUser(id) {
    const deletedUser = await this.repository.DeleteById(id);
    return FormateData(deletedUser);
  }

  async UpdateUser(userInputs) {
    const { firstName, lastName, email, type, id } = userInputs;

    const updatedUser = await this.repository.UpdateUserById({
      firstName,
      lastName,
      email,
      type,
      id,
    });

    return FormateData({ ...updatedUser._doc });
  }

  async GetUsers() {
    const usersList = await this.repository.FetchUsers();
    return FormateData(usersList);
  }
}

module.exports = CustomerService;
