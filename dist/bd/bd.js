"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const dbConfig = {
    user: 'admin',
    host: 'localhost',
    database: 'my_app_db',
    password: 'admin',
    port: 5432,
};
if (!dbConfig.password || typeof dbConfig.password !== 'string') {
    throw new Error('PostgreSQL password must be a string!');
}
exports.pool = new pg_1.Pool(dbConfig);
exports.pool
    .query("SELECT NOW()")
    .then(() => console.log("PostgreSQL connected"))
    .catch((err) => console.error("PostgreSQL connection error", err));
// export default {
// 	query: (text: string, params?: any[]) => pool.query(text, params),
// 	pool,
// };
