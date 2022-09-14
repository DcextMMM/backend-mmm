import { Router } from 'express';
import authMiddleware from '../middlewares/auth';

import UserController from '../controllers/users';

class User {
  constructor() {
    this.routes = new Router();
    this.userController = new UserController();
  }

  setup() {
    this.routes.post('/login', this.userController.login);
    this.routes.post('/cadastro', this.userController.cadastro);

    this.routes.use(authMiddleware);

    this.routes.put('/user', this.userController.update);

    return this.routes;
  }
}

export default User;
