import {
  object,
  string,
  number,
  date,
  boolean,
} from 'yup';


const schemas = {
  create: {
    body: object().shape({
      nome: string('Invalid format.').required('Name field is mandatory.'),
      preco: number('Invalid format.').required('Price field is mandatory.'),
      quantidade: number('Invalid format.').required('Amount field is mandatory.'),
      data_colheita: date('Invalid format.').required('Collection date is mandatory.').min(new Date),
      produtor_id: string('Invalid format.').required('Produtor id is mandatory'),
      vendido: boolean('Invalid format.').required('Status is mandatory.')
    })
  }
};

export default {
  create: object(schemas.create)
};
