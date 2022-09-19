import { Router } from 'express';

import productSchema from '../schemas/product';
import ProductController from '../controllers/product';
import authMiddleware from '../middlewares/auth';
import SchemaValidator from '../middlewares/schema-validator';

class Product {
  constructor() {
    this.routes = new Router();
    this.productController = new ProductController();
  }

  setup() {
    this.routes.use(authMiddleware);

    this.routes.get('/', this.productController.list);
    this.routes.get('/:id', this.productController.list);
    this.routes.post('/', SchemaValidator.validate(productSchema.create), this.productController.create);

    return this.routes;
  }
}

export default Product;
