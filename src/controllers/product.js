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

      if (req.params && req.params.id) {
        product = await this.productService.find(req.params);
      } else {
        product = await this.productService.list(req.query);
      }

      Handle.success(product, res);
    } catch (error) {
      Handle.error(error, res);
    }
  }

  async create(req, res) {
    try {
      const response = await this.productService.create(req.body, { id: req.userId, type: req.userType });

      Handle.success(response, res);
    } catch (error) {
      Handle.error(error, res);
    }
  }

  async delete(req, res) {
    try {
      const response = await this.productService.delete(req.params, { id: req.userId, type: req.userType });

      Handle.success(response, res);
    } catch (error) {
      Handle.error(error, res);
    }
  }
}

export default Product;
