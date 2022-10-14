import { Router } from 'express';

import ProductController from '../controllers/product';
import authMiddleware from '../middlewares/auth';

class BaseProducts {
  constructor() {
    this.routes = Router();
    this.productController = new ProductController();
  }

  setup() {
    this.routes.use(authMiddleware);

    this.routes.get('/', this.productController.listBaseProducts);

    return this.routes;
  }

}

export default BaseProducts;

