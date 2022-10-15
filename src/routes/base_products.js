import { Router } from 'express';

import BaseProductsControllers from '../controllers/base_products';
import authMiddleware from '../middlewares/auth';
import SchemaValidator from '../middlewares/schema-validator';
import baseProductsSchemas from '../schemas/base_products';

class BaseProducts {
  constructor() {
    this.routes = Router();
    this.baseProductsControllers = new BaseProductsControllers();
  }

  setup() {
    this.routes.use(authMiddleware);

    this.routes.get('/', SchemaValidator.validate(baseProductsSchemas.list),this.baseProductsControllers.list);
    this.routes.get('/:id', SchemaValidator.validate(baseProductsSchemas.find), this.baseProductsControllers.list);

    return this.routes;
  }

}

export default BaseProducts;

