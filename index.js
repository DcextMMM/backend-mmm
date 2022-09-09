import databaseUtils from './src/utils/database';

databaseUtils.startDatabase();

import App from './src/app';

const app = new App();

app.startServer();
