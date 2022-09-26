import { Router } from 'express';

import UserRoutes from './routes/users';
import ProductRoutes from './routes/product';
import RequestRoutes from './routes/requests';

class Routes {
  constructor() {
    this.routes = new Router();

    this.userRoutes = new UserRoutes();
    this.productRoutes = new ProductRoutes();
    this.requestRoutes = new RequestRoutes();
  }

  setup() {
    this.routes.use('/', this.userRoutes.setup());
    this.routes.use('/products', this.productRoutes.setup());
    this.routes.use('/requests', this.requestRoutes.setup());

    return this.routes;
  }
}

export default Routes;
