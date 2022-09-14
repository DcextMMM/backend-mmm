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
      return res.json({ error });
    }
  }

  async cadastro(req, res) {
    try {
      await this.userService.cadastro(req.body);

      return res.json({ ok: true });
    } catch (error) {
      return res.json({ error });
    }
  }

  async update(req, res) {
    try {
      const filter = {
        id: req.userId,
        type: req.body.type
      };
      const changes = omit(req.body, ['type']);

      await this.userService.update(filter , changes);

      return res.json({ ok: true });
    } catch (error) {
      return res.json({ error });
    }
  }
}

export default Users;
