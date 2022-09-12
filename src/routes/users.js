import { Router } from 'express';

import UserController from '../controllers/users';

class User {
  constructor() {
    this.routes = new Router();
    this.userController = new UserController();
  }

  setup() {
    this.routes.post('/login', this.userController.login);
    this.routes.post('/cadastro', this.userController.cadastro);

    return this.routes;
  }
}

export default User;
