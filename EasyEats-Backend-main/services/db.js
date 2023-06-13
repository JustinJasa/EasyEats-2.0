
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

// function delay(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function connectWithRetry(pool, retries = 0) {
//     try {
//       await pool.getConnection();
//       console.log('Successfully connected to the database');
//     } catch (error) {
//       if (retries < 10) {
//         console.log(`Failed to connect to the database. Retrying in ${RETRY_DELAY / 1000} seconds...`);
//         await delay(10000);
//         await connectWithRetry(pool, retries + 1);
//       } else {
//         console.error('Max retries reached. Exiting...');
//         process.exit(1);
//       }
//     }
//   }

//   connectWithRetry(pool)
export default pool.promise();
