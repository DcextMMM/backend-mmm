import fs from 'fs';

export default {
    startDatabase: () => {
        const tables = ['agronomo', 'produtor'];
        const models = fs.readdirSync('src/models').filter(model => model !== 'schemas');

        if (!models.length) {
            tables.forEach(model => {
                const baseModel = {
                    data: []
                };

                fs.writeFileSync(`src/models/${model}.json`, JSON.stringify(baseModel));
            });
        }
    }
}