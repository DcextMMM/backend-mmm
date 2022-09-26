import fs from 'fs';
import moment from 'moment';
import Handle from '../utils/handle-response.js';
export default class Product {
  constructor() {
    this.readDatabase();
  }

  readDatabase() {
    this.products = JSON.parse(fs.readFileSync('src/models/products.json', 'utf8'));
  }

  listFiltered(filter) {
    const productsFiltered = this.products.data.filter(product => {
      const dateLower = filter.dateLower ? moment(filter.dateLower, 'YYYY-MM-DD') : moment();
      const dateUpper = filter.dateUpper ? moment(filter.dateUpper, 'YYYY-MM-DD') : moment();

      const filterName = filter.name ? product.nome.includes(filter.name) : true;
      const filterPrice = ~~filter.priceLower || ~~filter.priceUpper ? product.preco >= (~~filter.priceLower || 0) && product.preco <= (~~filter.priceUpper || 100000000) : true;
      const filterDate = dateLower || dateUpper ? moment(product.data_colheita, 'YYYY-MM-DD').isBetween(dateLower, dateUpper, 'days', '[]') : true;

      if (filterName && filterPrice && filterDate) {
        return product;
      }
    });

    if (!productsFiltered.length) {
      throw Handle.exception('NO_PRODUCTS');
    }

    return productsFiltered;
  }

  list(filter) {
    this.readDatabase();

    if (!this.products.data.length) {
      throw Handle.exception('NO_PRODUCTS');
    }

    if (filter.name || filter.priceLower || filter.priceUpper || filter.dateLower || filter.dateUpper) {
      return this.listFiltered(filter);
    }

    return this.products.data;
  }

  find(filter) {
    this.readDatabase();

    if (!this.products.data) {
      throw Handle.exception('NO_PRODUCTS');
    }

    const product = this.products.data.find(product => product.id === ~~filter.id);

    if (!product) {
      throw Handle.exception('NOT_FOUND');
    }

    return product;
  }

  create(data, meta) {
    if (meta.type !== 'produtor') {
      throw Handle.exception('UNAUTHORIZED_ACCESSS');
    }

    this.readDatabase();

    data.vendido = false;
    data.produtor_id = meta.id;
    data.id = this.products.data.length ? this.products.data.at(-1).id + 1 : 1;

    this.products.data.push(data);
    fs.writeFileSync('src/models/products.json', JSON.stringify(this.products));
    return { sucess: true };
  }

  delete(filter, meta) {
    if (meta.type !== 'produtor')
      throw Handle.exception('UNAUTHORIZED_ACCESSS');

    this.readDatabase();

    const product = this.products.data.find(product => product.id === ~~filter.id);

    if (!product) {
      throw Handle.exception('NOT_FOUND');
    }

    if (product.produtor_id !== meta.id)
      throw Handle.exception('UNAUTHORIZED_ACCESSS');

    this.products.data.splice(this.products.data.indexOf(product), 1);
    fs.writeFileSync('src/models/products.json', JSON.stringify(this.products));
    return { sucess: true };
  }
}
