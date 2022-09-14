import fs from 'fs';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import HashUtils from '../utils/hash';
import authConfig from '../config/auth';
import agronomo from '../models/agronomo.json';
import produtor from '../models/produtor.json';

export default class Users {
  constructor() {
    this.agronomo = agronomo;
    this.produtor = produtor;
  }

  async login(data) {
    let users;

    if (data.type === 'produtor') {
      users = this.produtor;
    } else if (data.type === 'agronomo') {
      users = this.agronomo;
    } else {
      throw 'WRONG_USER_TYPE';
    }

    const user = users.data.find(user => user.email === data.login);

    if (!user) {
      throw 'LOGIN_OR_PASSWORD_WRONG';
    }

    const samePassword = await HashUtils.compare(user.senha, data.senha);

    if (!samePassword) {
      throw 'LOGIN_OR_PASSWORD_WRONG';
    }

    return jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiration
    });
  }

  async cadastro(data) {
    const user = _.omit(data, ['type']);

    user.senha = await HashUtils.encrypt(user.senha);

    if (data.type === 'agronomo') {
      const emailExists = this.agronomo.data.some(user => user.email === data.email);

      if (emailExists) {
        throw 'EMAIL_ALREDY_EXISTS';
      }

      user.id = this.agronomo.data.length + 1;

      this.agronomo.data.push(user);

      fs.writeFileSync('src/models/agronomo.json', JSON.stringify(this.agronomo));
    } else if (data.type === 'produtor') {
      const emailExists = this.produtor.data.some(user => user.email === data.email);

      if (emailExists) {
        throw 'EMAIL_ALREDY_EXISTS';
      }

      user.id = this.produtor.data.length + 1;

      this.produtor.data.push(user);

      fs.writeFileSync('src/models/produtor.json', JSON.stringify(this.produtor));
    }

    return user;
  }

  async update(filter, changes) {
    let users;

    if (filter.type === 'agronomo') {
      users = this.agronomo;
    } else if (filter.type === 'produtor') {
      users = this.produtor;
    } else {
      throw 'User type does not exist.';
    }

    const emailExists = changes.email && users.data.some(user => user.email === changes.email);

    if (emailExists) {
      throw 'EMAIL_ALREDY_EXISTS';
    }

    const user = users.data.find(user => user.id === filter.id);
    console.log(user);
    if (!user) {
      throw 'Id does not exist.';
    }

    users.data[filter.id - 1] = _.merge(users.data[filter.id - 1], changes);

    fs.writeFileSync(`src/models/${filter.type}.json`, JSON.stringify(users));
  }
}
