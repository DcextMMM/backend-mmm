import fs from 'fs';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import HashUtils from '../utils/hash';
import authConfig from '../config/auth';
import Handle from '../utils/handle-response';

export default class Users {
  constructor() {
    this.readDatabase();
  }

  readDatabase() {
    this.agronomo = JSON.parse(fs.readFileSync('src/models/agronomo.json', 'utf8'));
    this.produtor = JSON.parse(fs.readFileSync('src/models/produtor.json', 'utf8'));
  }

  async login(data) {
    this.readDatabase();

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

    const samePassword = await HashUtils.compare(user.senha, data.senha);

    if (!samePassword) {
      throw Handle.exception('LOGIN_OR_PASSWORD_WRONG');
    }

    return jwt.sign({ id: user.id, type: data.type }, authConfig.secret, {
      expiresIn: authConfig.expiration
    });
  }

  async cadastro(data) {
    this.readDatabase();

    const user = _.omit(data, ['type']);

    user.senha = await HashUtils.encrypt(user.senha);

    if (data.type === 'agronomo') {
      const emailExists = this.agronomo.data.some(user => user.email === data.email);

      if (emailExists) {
        throw Handle.exception('EMAIL_ALREDY_EXISTS');
      }

      user.id = this.agronomo.data.length ? this.agronomo.data.at(-1).id + 1 : 1;

      this.agronomo.data.push(user);

      fs.writeFileSync('src/models/agronomo.json', JSON.stringify(this.agronomo));
    } else if (data.type === 'produtor') {
      const emailExists = this.produtor.data.some(user => user.email === data.email);

      if (emailExists) {
        throw Handle.exception('EMAIL_ALREDY_EXISTS');
      }

      user.id = this.produtor.data.length ? this.produtor.data.at(-1).id + 1 : 1;

      this.produtor.data.push(user);

      fs.writeFileSync('src/models/produtor.json', JSON.stringify(this.produtor));
    }

    return { success: true };
  }

  async update(filter, changes) {
    this.readDatabase();

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
      const samePassword = await HashUtils.compare(user.senha, changes.oldPassword);

      if (!samePassword) {
        throw Handle.exception('WRONG_PASSWORD');
      }

      changes.senha = await HashUtils.encrypt(changes.senha);
    }

    changes = _.omit(changes, ['oldPassword']);
    users.data[filter.id - 1] = _.merge(users.data[filter.id - 1], changes);

    fs.writeFileSync(`src/models/${filter.type}.json`, JSON.stringify(users));

    return { success: true };
  }

  async delete(filter) {
    this.readDatabase();
    let users;

    if (filter.type === 'agronomo') {
      users = this.agronomo;
    } else if (filter.type === 'produtor') {
      users = this.produtor;
    } else {
      throw Handle.exception('WRONG_USER_TYPE');
    }



    const user = users.data.find(user => user.id === ~~filter.id);
    if (!user) throw Handle.exception('USER_NOT_EXIST');
    users.data.splice(this.produtor.data.indexOf(user), 1);

    fs.writeFileSync(`src/models/${filter.type}.json`, JSON.stringify(users));

    return { sucess: true };
  }

  find(filter) {
    this.readDatabase();

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
      throw Handle.exception('LOGIN_OR_PASSWORD_WRONG');
    }

    return user;
  }
}
