import { Pool } from "pg";
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
export const pool = new Pool(dbConfig);
pool
    .query("SELECT NOW()")
    .then(() => console.log("PostgreSQL connected"))
    .catch((err) => console.error("PostgreSQL connection error", err));
// export default {
// 	query: (text: string, params?: any[]) => pool.query(text, params),
// 	pool,
// };
