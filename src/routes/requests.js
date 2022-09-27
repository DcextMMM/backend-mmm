import { Router } from 'express';

import requestSchema from '../schemas/request';
import RequestController from '../controllers/request';
import authMiddleware from '../middlewares/auth';
import SchemaValidator from '../middlewares/schema-validator';

class Requests {
  constructor() {
    this.routes = new Router();
    this.requestController = new RequestController();
  }

  setup() {
    this.routes.use(authMiddleware);

    this.routes.post('/:id', SchemaValidator.validate(requestSchema.create), this.requestController.create);
    this.routes.get('/', SchemaValidator.validate(requestSchema.list), this.requestController.list);
    this.routes.get('/:id', SchemaValidator.validate(requestSchema.find), this.requestController.list);
    this.routes.delete('/:id', SchemaValidator.validate(requestSchema.delete), this.requestController.delete);

    return this.routes;
  }
}

export default Requests;
