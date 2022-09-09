import cors from 'cors';
import express from 'express';

import Routes from './routes.js';

export default class App {
    constructor() {
        this.app = express();
        this.routes = new Routes();

        this.app.use(cors());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());

        this.app.use(this.routes.setup());
    }

    startServer() {
        this.app.listen(3210, () => {
            console.log('Server started in port 3210');
        });
    }
};
