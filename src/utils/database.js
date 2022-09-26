import fs from 'fs';

export default {
  startDatabase: () => {
    const tables = ['agronomo', 'produtor', 'products', 'requests'];
    const models = fs.readdirSync('src/models').filter(model => model !== 'schemas');

    if (models.length !== tables.length) {
      tables.forEach(table => {
        const baseModel = {
          data: []
        };

        fs.writeFileSync(`src/models/${table}.json`, JSON.stringify(baseModel));
      });
    }
  }
};
