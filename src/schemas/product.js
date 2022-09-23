import {
  object,
  string,
  number,
  date
} from 'yup';


const schemas = {
  create: {
    body: object().shape({
      nome: string('Invalid format.').required('Name field is mandatory.'),
      preco: number('Invalid format.').required('Price field is mandatory.'),
      quantidade: number('Invalid format.').required('Amount field is mandatory.'),
      data_colheita: date('Invalid format.').required('Collection date is mandatory.').min(new Date)
    }).noUnknown()
  },
  list: {
    query: object().shape({
      name: string('Invalid format.'),
      priceLower: number('Invalid format.').positive('Invalid price.'),
      priceUpper: number('Invalid format.').positive('Invalid price.'),
      dateLower: date('Invalid format.'),
      dateUpper: date('Invalid format.')
    }).noUnknown()
  },
  find: {
    params: object().shape({
      id: number('Invalid format').positive('Invalid id.')
    }).noUnknown()
  }
};

export default {
  create: object(schemas.create),
  list: object(schemas.list),
  find: object(schemas.find),
  delete: object(schemas.find)
};
