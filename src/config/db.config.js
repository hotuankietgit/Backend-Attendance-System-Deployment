"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entityManager = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
require("dotenv/config");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: true,
    entities: ["./src/models/*.ts", "./src/models/*.js"],
    subscribers: [],
    migrations: ["./src/migrations/*.ts", "./src/migrations/*.js"]
});
exports.entityManager = exports.AppDataSource.manager;
const Connections = () => {
    exports.AppDataSource.initialize().then(() => {
        console.log('DB Connected');
    }).catch((e) => {
        console.log('error' + e);
    });
};
exports.default = Connections;
