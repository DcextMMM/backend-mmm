import ProductService from '../services/product.js';
import Handle from '../utils/handle-response.js';

class Product {
  constructor() {
    this.productService = new ProductService();

    this.list = this.list.bind(this);
    this.create = this.create.bind(this);
  }

  list(req, res) {
    try {
      let product;

      if (req.params && req.params.id) {
        product = this.productService.find(req.params);
      } else {
        product = this.productService.list(req.query);
      }

      Handle.success(product, res);
    } catch (error) {
      Handle.error(error, res);
    }
  }

  create(req, res) {
    try {
      const response = this.productService.create(req.body, { id: req.userId, type: req.userType });

      Handle.success(response, res);
    } catch (error) {
      Handle.error(error, res);
    }
  }
}

export default Product;
