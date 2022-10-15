import fs from 'fs';
import Handle from '../utils/handle-response';

export default class BaseProducts {
  constructor() {
    this.readDatabase();
  }

  readDatabase() {
    this.baseProducts = JSON.parse(fs.readFileSync('src/utils/data/base_products.json', 'utf-8'));
  }

  list(filter) {
    if (filter.type !== 'produtor') throw Handle.exception('UNAUTHORIZED_ACESS');

    this.readDatabase();

    if (filter.productType)
      return this.listFiltered(filter);

    if (!this.baseProducts.data)
      throw Handle.exception('NO_PRODUCTS');

    return this.baseProducts.data;
  }

  listFiltered(filter) {
    const productsFiltered = this.baseProducts.data.filter(product => filter.productType === product.type);

    if (!productsFiltered)
      throw Handle.exception('NO_PRODUCTS');

    return productsFiltered;
  }

  find(filter) {
    this.readDatabase();

    if (!this.baseProducts.data)
      throw Handle.exception('NO_PRODUCTS');

    const response = this.baseProducts.data.find(product => product.id === ~~filter.id);

    if (!response) throw Handle.exception('NOT_FOUND');

    return response;
  }
}

