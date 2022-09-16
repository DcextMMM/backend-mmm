import { omit } from 'lodash';

import UserService from '../services/users.js';

class Users {
  constructor() {
    this.userService = new UserService();

    this.login = this.login.bind(this);
    this.cadastro = this.cadastro.bind(this);
    this.update = this.update.bind(this);
  }

  async login(req, res) {
    try {
      const token = await this.userService.login(req.body);

      return res.json({ token });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async cadastro(req, res) {
    try {
      const { id, nome, email } = await this.userService.cadastro(req.body);

      return res.json({
        id,
        nome,
        email
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async update(req, res) {
    try {
      const filter = {
        id: req.userId,
        type: req.body.type
      };
      req.body = omit(req.body, ['type']);

      const { id, nome, email } = await this.userService.update(filter , req.body);

      return res.json({
        id,
        nome,
        email
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}

export default Users;
