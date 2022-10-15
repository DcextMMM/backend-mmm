import ProductService from '../services/product.js';
import Handle from '../utils/handle-response.js';

class Product {
  constructor() {
    this.productService = new ProductService();

    this.list = this.list.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
  }

  async list(req, res) {
    try {
      let product;

      if (req.filter && req.filter.id) {
        product = this.productService.find(req.filter);
      } else {
        product = this.productService.list(req.filter);
      }

      Handle.success(product, res);
    } catch (error) {
      Handle.error(error, res);
    }
  }

  async create(req, res) {
    try {
      const response = this.productService.create(req.data, { id: req.userId, type: req.userType });

      Handle.success(response, res);
    } catch (error) {
      Handle.error(error, res);
    }
  }

  async delete(req, res) {
    try {
      const response = this.productService.delete(req.filter, { id: req.userId, type: req.userType });

      Handle.success(response, res);
    } catch (error) {
      Handle.error(error, res);
    }
  }

}

export default Product;
