import { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import Validate from '../middlewares/validate';

import UserController from '../controllers/users';

class User {
  constructor() {
    this.routes = new Router();
    this.userController = new UserController();
    this.schemaValidator = new Validate();
  }

  setup() {
    this.routes.post('/login', this.schemaValidator.login, this.userController.login);
    this.routes.post('/cadastro', this.schemaValidator.cadastro, this.userController.cadastro);

    this.routes.use(authMiddleware);

    this.routes.put('/user', this.schemaValidator.update, this.userController.update);

    return this.routes;
  }
}

export default User;
