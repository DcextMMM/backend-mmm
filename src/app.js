import cors from 'cors';
import express from 'express';

import routes from './routes.js';

export default class App {
    constructor() {
        this.app = express();

        this.app.use(cors());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());

        this.app.use(routes);
    }

    startServer() {
        this.app.listen(3210, () => {
            console.log('Server started in port 3210');
        });
    }
};
