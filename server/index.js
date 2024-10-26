// Import necessary libraries
const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/products');
const pool = require('./db'); // Import the pool from your db.js file (for database connection)
require('dotenv').config(); // Load environment variables

// Initialize the Express app
const app = express();

// Middleware to enable CORS and parse incoming JSON requests
app.use(cors());
app.use(express.json());

// Route handling for product-related API requests
app.use('/api/products', productsRouter);

// Function to test database connection and start the server
const startServer = async () => {
  try {
    // Test the database connection
    await pool.connect();
    console.log('Connected to the PostgreSQL database successfully.');

    // Set the server to listen on the port defined in environment variables, or default to port 5000
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    // Log any errors if the connection to the database fails
    console.error('Failed to connect to the database:', err);
    process.exit(1); // Exit the process if database connection fails
  }
};

// Start the server and confirm database connection
startServer();
