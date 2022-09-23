import UserService from '../services/users.js';
import Handle from '../utils/handle-response.js';

class Users {
  constructor() {
    this.userService = new UserService();

    this.login = this.login.bind(this);
    this.cadastro = this.cadastro.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async login(req, res) {
    try {
      const token = await this.userService.login(req.data);

      Handle.success({ token }, res);
    } catch (error) {
      Handle.error(error, res);
    }
  }

  async cadastro(req, res) {
    try {
      const response = await this.userService.cadastro(req.data);

      Handle.success(response, res);
    } catch (error) {
      Handle.error(error, res);
    }
  }

  async update(req, res) {
    try {
      const filter = {
        id: req.userId,
        type: req.data.type
      };
      const data = {
        ...req.data
      };

      delete data.type;

      const response = await this.userService.update(filter , data);

      Handle.success(response, res);
    } catch (error) {
      Handle.error(error, res);
    }
  }

  async delete(req, res) {
    try {
      const response = this.userService.delete({ id: req.userId, type: req.userType });
      Handle.success(response, res);
    } catch (error) {
      Handle.error(error, res);
    }
  }
}

export default Users;
