import {
  object,
  string,
  ref
} from 'yup';
import Validator from '../utils/validator';

const schemas = {
  cadastro: {
    body: object().shape({
      nome: string('Invalid format.').required('Name field is mandatory.').max(30, 'Name length greater then 30.'),
      email: string('Invalid format.').required('Email field is mandatory.').email('Invalid email.'),
      senha: string('Invalid format.').required('Password field is mandatory.').min(6, 'Password length smaller then 6.'),
      cpf: string('Invalid format.').test('check-cpf', 'Invalid cpf.', cpf => !cpf || Validator.checkCpf(cpf)),
      telefone: string('Invalid format.'),
      endereço: object().shape({
        rua: string('Invalid format.'),
        numero: string('Invalid format.'),
        cep: string('Invalid format.'),
        extra: string('Invalid format.')
      }),
      type: string('Invalid format.').required('Type is mandatory.')
    }).noUnknown()
  },

  login: {
    body: object().shape({
      type: string('Invalid format.').required('Type is mandatory.'),
      login: string('Invalid format.').required('Login is mandatory.').email('Invalid email.'),
      senha: string('Invalid format.').required('Password is mandatory.').min(6, 'Password length smaller then 6.')
    }).noUnknown()
  },

  update: {
    body: object().shape({
      nome: string('Invalid format.').max(30, 'Name length greater then 30.'),
      email: string('Invalid format.').email('Invalid email.'),
      oldPassword: string('Invalid format.').min(6, 'Password length smaller then 6.'),
      senha: string('Invalid format.').required('Password field is mandatory.').min(6, 'Password length smaller then 6.')
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required(): field),
      confirmPassword: string().when('senha', (senha, field) =>
        senha ? field.required().oneOf([ref('senha')]) : field),
      cpf: string('Invalid format.').test('check-cpf', 'Invalid cpf.', cpf => Validator.checkCpf(cpf)),
      telefone: string('Invalid format.'),
      endereço: object().shape({
        rua: string('Invalid format.'),
        numero: string('Invalid format.'),
        cep: string('Invalid format.'),
        extra: string('Invalid format.')
      }),
      type: string('Invalid format.').required('Type is mandatory.')
    }).noUnknown()
  }
};

export default {
  cadastro: object(schemas.cadastro),
  login: object(schemas.login),
  update: object(schemas.update)
};
