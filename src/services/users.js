import fs from 'fs';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import HashUtils from '../utils/hash';
import authConfig from '../config/auth';
import Handle from '../utils/handle-response';
import agronomo from '../models/agronomo.json';
import produtor from '../models/produtor.json';

export default class Users {
  constructor() {
    this.agronomo = agronomo;
    this.produtor = produtor;
  }

  login(data) {
    let users;

    if (data.type === 'produtor') {
      users = this.produtor;
    } else if (data.type === 'agronomo') {
      users = this.agronomo;
    } else {
      throw Handle.exception('WRONG_USER_TYPE');
    }

    const user = users.data.find(user => user.email === data.login);

    if (!user) {
      throw Handle.exception('LOGIN_OR_PASSWORD_WRONG');
    }

    const samePassword = HashUtils.compare(user.senha, data.senha);

    if (!samePassword) {
      throw Handle.exception('LOGIN_OR_PASSWORD_WRONG');
    }

    return jwt.sign({ id: user.id, type: data.type }, authConfig.secret, {
      expiresIn: authConfig.expiration
    });
  }

  cadastro(data) {
    const user = _.omit(data, ['type']);

    user.senha = HashUtils.encrypt(user.senha);

    if (data.type === 'agronomo') {
      const emailExists = this.agronomo.data.some(user => user.email === data.email);

      if (emailExists) {
        throw Handle.exception('EMAIL_ALREDY_EXISTS');
      }

      user.id = this.agronomo.data.length + 1;

      this.agronomo.data.push(user);

      fs.writeFileSync('src/models/agronomo.json', JSON.stringify(this.agronomo));
    } else if (data.type === 'produtor') {
      const emailExists = this.produtor.data.some(user => user.email === data.email);

      if (emailExists) {
        throw Handle.exception('EMAIL_ALREDY_EXISTS');
      }

      user.id = this.produtor.data.length + 1;

      this.produtor.data.push(user);

      fs.writeFileSync('src/models/produtor.json', JSON.stringify(this.produtor));
    }

    return { success: true };
  }

  update(filter, changes) {
    let users;

    if (filter.type === 'agronomo') {
      users = this.agronomo;
    } else if (filter.type === 'produtor') {
      users = this.produtor;
    } else {
      throw Handle.exception('WRONG_USER_TYPE');
    }

    const user = users.data.find(user => user.id === filter.id);

    if (!user) {
      throw Handle.exception('NOT_FOUND');
    }

    if (changes.senha) {
      const samePassword = HashUtils.compare(user.senha, changes.oldPassword);

      if (!samePassword) {
        throw Handle.exception('WRONG_PASSWORD');
      }

      changes.senha = HashUtils.encrypt(changes.senha);
    }

    changes = _.omit(changes, ['oldPassword']);
    users.data[filter.id - 1] = _.merge(users.data[filter.id - 1], changes);

    fs.writeFileSync(`src/models/${filter.type}.json`, JSON.stringify(users));

    return { success: true };
  }
}
