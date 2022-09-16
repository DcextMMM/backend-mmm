import * as Yup from 'yup';
import Validator from '../utils/validator';

export default class Schemas {
  constructor() {
    this.cadastro = Yup.object().shape({
      nome: Yup.string('Invalid format.').required('Name field is mandatory.').max(30, 'Name length greater then 30.'),
      email: Yup.string('Invalid format.').required('Name field is mandatory.').email('Invalid email.'),
      senha: Yup.string('Invalid format.').required('Password field is mandatory.').min(6, 'Password length smaller then 6.'),
      cpf: Yup.string('Invalid format.').test('check-cpf', 'Invalid cpf.', cpf => Validator.checkCpf(cpf)),
      telefone: Yup.string('Invalid format.'),
      endereço: Yup.object().shape({
        rua: Yup.string('Invalid format.'),
        numero: Yup.string('Invalid format.'),
        cep: Yup.string('Invalid format.'),
        extra: Yup.string('Invalid format.')
      }),
      type: Yup.string('Invalid format.').required('Type is mandatory.')
    });

    this.login = Yup.object().shape({
      type: Yup.string('Invalid format.').required('Type is mandatory.'),
      login: Yup.string('Invalid format.').required('Login is mandatory.').email('Invalid email.'),
      senha: Yup.string('Invalid format.').required('Password is mandatory.').min(6, 'Password length smaller then 6.')
    });

    this.update = Yup.object().shape({
      nome: Yup.string('Invalid format.').required('Name field is mandatory.').max(30, 'Name length greater then 30.'),
      email: Yup.string('Invalid format.').required('Name field is mandatory.').email('Invalid email.'),
      oldPassword: Yup.string('Invalid format.').min(6, 'Password length smaller then 6.'),
      senha: Yup.string('Invalid format.').required('Password field is mandatory.').min(6, 'Password length smaller then 6.')
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required(): field),
      confirmPassword: Yup.string().when('senha', (senha, field) =>
        senha ? field.required().oneOf([Yup.ref('senha')]) : field),
      cpf: Yup.string('Invalid format.').test('check-cpf', 'Invalid cpf.', cpf => Validator.checkCpf(cpf)),
      telefone: Yup.string('Invalid format.'),
      endereço: Yup.object().shape({
        rua: Yup.string('Invalid format.'),
        numero: Yup.string('Invalid format.'),
        cep: Yup.string('Invalid format.'),
        extra: Yup.string('Invalid format.')
      }),
      type: Yup.string('Invalid format.').required('Type is mandatory.')
    });

  }
}
