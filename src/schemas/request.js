import {
  object,
  string,
  number,
  date
} from 'yup';


const schemas = {
  list: {
    query: object().shape({
      name: string('Invalid format.'),
      dateLower: date('Invalid format.'),
      dateUpper: date('Invalid format.'),
      produtor_id: number('Invalid format.')
    }).noUnknown()
  },
  find: {
    params: object().shape({
      id: number('Invalid format').positive('Invalid id.')
    }).noUnknown()
  }
};

export default {
  create: object(schemas.find),
  list: object(schemas.list),
  find: object(schemas.find),
  delete: object(schemas.find)
};
