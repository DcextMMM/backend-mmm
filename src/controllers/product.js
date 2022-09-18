import ProductService from '../services/product.js';
import Handle from '../utils/handle-response.js';

class Product {
  constructor() {
    this.productService = new ProductService();

    this.list = this.list.bind(this);
    this.create = this.create.bind(this);
  }

  async list(req, res) {
    try {
      let response;

      if (req.params && req.params.id) {
        response = this.productService.find(req.params);
      } else {
        response = this.productService.list(req.query);
      }

      Handle.success(response, res);
    } catch (error) {
      Handle.error(error, res);
    }
  }

  async create(req, res) {
    try {
      const response = this.productService.create(req.body, { id: req.userId, type: req.userType });

      Handle.success(response, res);
    } catch (error) {
      Handle.error(error, res);
    }
  }
}

export default Product;
