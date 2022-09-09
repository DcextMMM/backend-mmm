import fs from 'fs';
import _ from 'lodash';

import agronomo from '../models/agronomo.json';
import produtor from '../models/produtor.json';

export default class Users {
    constructor() {
        this.agronomo = agronomo;
        this.produtor = produtor;
    }

    login() {
        return {
            agronomo: this.agronomo.data,
            produtor: this.produtor.data
        }
    }

    async cadastro(data) {
        const user = _.omit(data, ['type']);

        if (data.type === 'agronomo') {
            this.agronomo.data.push(user);

            fs.writeFileSync('src/models/agronomo.json', JSON.stringify(this.agronomo));
        } else if (data.type === 'produtor') {
            this.produtor.data.push(user);

            fs.writeFileSync('src/models/produtor.json', JSON.stringify(this.produtor));
        }

        return user;
    }
}
