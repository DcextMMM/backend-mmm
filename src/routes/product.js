import { Router } from 'express';

import ProductController from '../controllers/product';

class Product {
  constructor() {
    this.routes = new Router();
    this.productController = new ProductController();
  }

  setup() {
    this.routes.get('/', this.productController.list);
    this.routes.get('/:id', this.productController.list);
    this.routes.post('/', this.productController.create);

    return this.routes;
  }
}

export default Product;
