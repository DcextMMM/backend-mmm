import fs from 'fs';
import moment from 'moment';
import Handle from '../utils/handle-response.js';
import _ from 'lodash';

export default class Product {
  constructor() {
    this.readDatabase();
  }

  readDatabase() {
    this.products = JSON.parse(fs.readFileSync('src/models/products.json', 'utf8'));
    this.requests = JSON.parse(fs.readFileSync('src/models/requests.json', 'utf8'));
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

  createRequest(product, meta) {
    const request = _.omit(product, 'vendido');
    request.product_id = product.id;
    request.id = this.requests.data.length ? this.requests.data.at(-1).id + 1 : 1;
    request.agronomo_id = meta.id;

    this.requests.data.push(request);
    fs.writeFileSync('src/models/requests.json', JSON.stringify(this.requests));
  }

  request(filter, meta) {
    if (meta.type !== 'agronomo')
      throw Handle.exception('UNAUTHORIZED_ACESS');

    this.readDatabase();

    const product = this.products.data.find(product => product.id === ~~filter.id);

    if (!product) {
      console.log(product);
      throw Handle.exception('NOT_FOUND');
    }

    product.vendido = true;
    fs.writeFileSync('src/models/products.json', JSON.stringify(this.products));

    this.createRequest(product, meta);

    return { sucess: true };
  }

  listRequests(meta) {
    if (meta.type !== 'agronomo')
      throw Handle.exception('UNAUTHORIZED_ACESS');

    this.readDatabase();

    const requests = this.requests.data.filter(request => request.agronomo_id === ~~meta.id);
    console.log(requests);
    if (!requests.length)
      throw Handle.exception('NO_REQUESTS');

    return requests;
  }
}
