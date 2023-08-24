export default class UserDTO {
    constructor(user, buyedProducts) {
      this.first_name = user.first_name;
      this.last_name = user.last_name;
      this.email = user.email;
      this.fullName = `${this.first_name} ${this.last_name}`;
      this.buyedProducts = buyedProducts;
    }
  }
  