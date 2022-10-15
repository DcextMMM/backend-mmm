import fs from 'fs';
import Handle from '../utils/handle-response';

export default class BaseProducts {
  constructor() {
    this.readDatabase();
  }

  readDatabase() {
    this.baseProducts = JSON.parse(fs.readFileSync('src/utils/data/base_products.json', 'utf-8'));
  }

  listAll(type) {
    if (type !== 'produtor') throw Handle.exception('UNAUTHORIZED ACESS');

    this.readDatabase();

    const products = this.baseProducts.data;

    if (!products) throw Handle.exception('NOT_FOUND');

    return products;
  }
}

