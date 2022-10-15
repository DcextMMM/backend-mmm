import BaseProductsServices from '../services/base_products';
import Handle from '../utils/handle-response';

class BaseProducts {
  constructor() {
    this.baseProductsServices = new BaseProductsServices();

    this.listAll = this.listAll.bind(this);
  }

  async listAll(req, res) {
    try {
      const response = this.baseProductsServices.listAll(req.userType);

      Handle.success(response, res);
    } catch (error) {
      Handle.error(error, res);
    }
  }
}

export default BaseProducts;
