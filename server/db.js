// backend/db.js
const { Pool } = require('pg');

const pool2 = new Pool({
  user: 'postgres', // your postgres user
  host: 'localhost',
  database: 'product_db',
  password: 'Sunita@0201#', // your postgres password
  port: 9876, // adjust to your actual PostgreSQL port
});
const pool = new Pool({
  user: 'postgre_mousetruth', // your postgres user
  host: 'r8qar.h.filess.io',
  database: 'postgre_mousetruth',
  password: 'b49ed6aa26dc9d38dbff9bd50a64ad1b1459696f', // your postgres password
  port: 5433, // adjust to your actual PostgreSQL port
});



// Create table if it doesn't exist
const createProductsTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS mydata.products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        price FLOAT NOT NULL,
        quantity INTEGER NOT NULL
      );
    `);
    console.log("Table 'products' is ready.");
  } catch (err) {
    console.error('Error creating products table:', err.message);
  }
};

// Call the function to create the table when the app starts
createProductsTable();

module.exports = pool; // Export the pool to use in other files
