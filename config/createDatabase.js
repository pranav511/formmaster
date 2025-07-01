const mysql = require('mysql2/promise');

async function createDatabase() {
  try {
    // create a connection without database name
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'admin',  // your MySQL password if set
    });

    // Create database if not exists
    await connection.query('CREATE DATABASE IF NOT EXISTS formmaster');

    console.log('✅ Database "formmaster" created or already exists.');

    await connection.end();
  } catch (error) {
    console.error('❌ Error creating database:', error.message);
  }
}

createDatabase();
