import {
  object,
  string,
  number
} from 'yup';


const schemas = {
  list: {
    query: object().shape({
      productType: string('Invalid format.'),
    }).noUnknown()
  },
  find: {
    params: object().shape({
      id: number('Invalid format').positive('Invalid id.')
    }).noUnknown()
  }
};

export default {
  list: object(schemas.list),
  find: object(schemas.find)
};
