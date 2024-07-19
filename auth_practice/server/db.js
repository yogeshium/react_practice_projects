import pg from "pg";
const pool = new pg.Pool({
    user:"postgres",
    password: "123456",
    host: "localhost",
    port: 5432,
    database: "auth_practice"
});

export default pool;