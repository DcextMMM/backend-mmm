import { Router } from 'express';

import userSchema from '../schemas/users';
import AuthMiddleware from '../middlewares/auth';
import UserController from '../controllers/users';
import SchemaValidator from '../middlewares/schema-validator';

class User {
  constructor() {
    this.routes = new Router();
    this.userController = new UserController();
  }

  setup() {
    this.routes.post('/login', SchemaValidator.validate(userSchema.login), this.userController.login);
    this.routes.post('/cadastro', SchemaValidator.validate(userSchema.cadastro), this.userController.cadastro);

    this.routes.use(AuthMiddleware);

    this.routes.put('/user', SchemaValidator.validate(userSchema.update), this.userController.update);
    this.routes.delete('/user', this.userController.delete);

    return this.routes;
  }
}

export default User;
