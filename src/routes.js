import { Router } from 'express';

import UserRoutes from './routes/users';
import ProductRoutes from './routes/product';

class Routes {
  constructor() {
    this.routes = new Router();

    this.userRoutes = new UserRoutes();
    this.productRoutes = new ProductRoutes();
  }

  setup() {
    this.routes.use('/', this.userRoutes.setup());
    this.routes.use('/products', this.productRoutes.setup());

    return this.routes;
  }
}

export default Routes;
