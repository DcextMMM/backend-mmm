import { Router } from 'express';

import productSchema from '../schemas/product';
import ProductController from '../controllers/product';
import authMiddleware from '../middlewares/auth';
import SchemaValidator from '../middlewares/schema-validator';

class Requests {
  constructor() {
    this.routes = new Router();
    this.productController = new ProductController();
  }

  setup() {
    this.routes.use(authMiddleware);

    this.routes.get('/', SchemaValidator.validate(productSchema.listRequests), this.productController.listRequests);

    return this.routes;
  }
}

export default Requests;
