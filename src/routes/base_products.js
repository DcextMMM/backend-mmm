import { Router } from 'express';

import BaseProductsControllers from '../controllers/base_products';
import authMiddleware from '../middlewares/auth';

class BaseProducts {
  constructor() {
    this.routes = Router();
    this.baseProductsControllers = new BaseProductsControllers();
  }

  setup() {
    this.routes.use(authMiddleware);

    this.routes.get('/', this.baseProductsControllers.listAll);

    return this.routes;
  }

}

export default BaseProducts;

