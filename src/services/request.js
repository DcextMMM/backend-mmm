import fs from 'fs';
import Handle from '../utils/handle-response.js';
import _ from 'lodash';
import moment from 'moment';

export default class Request {
  constructor() {
    this.readDatabase();
  }

  readDatabase() {
    this.requests = JSON.parse(fs.readFileSync('src/models/requests.json', 'utf8'));
    this.products = JSON.parse(fs.readFileSync('src/models/products.json', 'utf8'));
  }

  create(filter, meta) {
    if (meta.type !== 'agronomo')
      throw Handle.exception('UNAUTHORIZED_ACESS');

    this.readDatabase();

    const product = this.products.data.find(product => product.id === ~~filter.id);

    if (!product) {
      throw Handle.exception('NOT_FOUND');
    }

    if (product.vendido)
      throw Handle.exception('NOT_AVAILABLE');


    product.vendido = true;
    fs.writeFileSync('src/models/products.json', JSON.stringify(this.products));

    const request = _.omit(product, 'vendido');
    request.product_id = product.id;
    request.id = this.requests.data.length ? this.requests.data.at(-1).id + 1 : 1;
    request.agronomo_id = meta.id;

    this.requests.data.push(request);
    fs.writeFileSync('src/models/requests.json', JSON.stringify(this.requests));

    return { sucess: true };
  }

  listFiltered(filter) {
    const requestsFiltered = this.requests.data.filter(request => {
      const dateLower = filter.dateLower ? moment(filter.dateLower, 'YYYY-MM-DD') : moment();
      const dateUpper = filter.dateUpper ? moment(filter.dateUpper, 'YYYY-MM-DD') : moment();

      const filterName = filter.name ? request.nome.includes(filter.name) : true;
      const filterDate = dateLower || dateUpper ? moment(request.data_colheita, 'YYYY-MM-DD').isBetween(dateLower, dateUpper, 'days', '[]') : true;
      const filterProdutor = filter.produtor_id ? request.produtor_id === filter.produtor_id : true;

      if (filterName && filterDate && filterProdutor)
        return request;
    });

    if (!requestsFiltered.length)
      throw Handle.exception('NO_REQUESTS');

    return requestsFiltered;
  }

  list(filter, meta) {
    this.readDatabase();
    const requests = this.requests.data.filter(request => meta.type === 'agronomo' ? request.agronomo_id === ~~meta.id : request.produtor_id === ~~meta.id);

    if (!requests.length)
      throw Handle.exception('NO_REQUESTS');

    if (filter.name || filter.dateLower || filter.dateUpper || filter.produtor_id)
      return this.listFiltered(filter);

    return requests;
  }

  find(filter) {
    if (filter.type !== 'agronomo')
      throw Handle.exception('UNAUTHORIZED_ACESS');

    this.readDatabase();

    const request = this.request.data.find(request => request.id === ~~filter.id);

    if (!request)
      throw Handle.exception('NOT_FOUND');

    return request;
  }

  delete(filter, meta) {
    if (meta.type !== 'agronomo' || filter.id !== meta.id)
      throw Handle.exception('UNAUTHORIZED_ACESS');

    this.readDatabase();

    const request = this.requests.data.find(request => request.id === ~~filter.id);

    const product = this.products.data.find(product => product.id === request.product_id);

    if (!product || !request)
      throw Handle.exception('NOT_FOUND');

    product.vendido = false;

    fs.writeFileSync('src/models/products.json', JSON.stringify(this.products));

    this.requests.data.splice(this.requests.data.indexOf(request), 1);

    fs.writeFileSync('src/models/requests.json', JSON.stringify(this.requests));

    return { sucess: true };
  }
}
