import { Router } from 'express';

const routes = new Router();

routes.use('/', (req, res) => { res.send('ok') });

export default routes;
