
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();


const pool = mysql.createPool({
  host: process.env.DB_HOST, // Make sure you are using the environment variable here
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'easy_eats',
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0,
});

export default pool.promise();
