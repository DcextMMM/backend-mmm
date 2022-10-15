import BaseProductsServices from '../services/base_products';
import Handle from '../utils/handle-response';

class BaseProducts {
  constructor() {
    this.baseProductsServices = new BaseProductsServices();

    this.list = this.list.bind(this);
  }

  async list(req, res) {
    try {
      let response;

      if (req.filter && req.filter.id) {
        response = this.baseProductsServices.find(req.filter);
      } else {
        response = this.baseProductsServices.list({ type: req.userType, productType: req.filter.productType });
      }

      Handle.success(response, res);
    } catch (error) {
      Handle.error(error, res);
    }
  }
}

export default BaseProducts;
