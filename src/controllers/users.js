import { omit } from 'lodash';

import UserService from '../services/users.js';
import Handle from '../utils/handle-response.js';

class Users {
  constructor() {
    this.userService = new UserService();

    this.login = this.login.bind(this);
    this.cadastro = this.cadastro.bind(this);
    this.update = this.update.bind(this);
  }

  login(req, res) {
    try {
      const token = this.userService.login(req.body);

      Handle.success({ token }, res);
    } catch (error) {
      Handle.error(error, res);
    }
  }

  cadastro(req, res) {
    try {
      const response = this.userService.cadastro(req.body);

      Handle.success(response, res);
    } catch (error) {
      Handle.error(error, res);
    }
  }

  update(req, res) {
    try {
      const filter = {
        id: req.userId,
        type: req.body.type
      };
      req.body = omit(req.body, ['type']);

      const response = this.userService.update(filter , req.body);

      Handle.success(response, res);
    } catch (error) {
      Handle.error(error, res);
    }
  }
}

export default Users;
