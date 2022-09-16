import { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import cadastroValidator from '../middlewares/store';
import loginValidator from '../middlewares/login';
import updateValidator from '../middlewares/update';

import UserController from '../controllers/users';

class User {
  constructor() {
    this.routes = new Router();
    this.userController = new UserController();
  }

  setup() {
    this.routes.post('/login', loginValidator, this.userController.login);
    this.routes.post('/cadastro', cadastroValidator, this.userController.cadastro);

    this.routes.use(authMiddleware);

    this.routes.put('/user', updateValidator, this.userController.update);

    return this.routes;
  }
}

export default User;
