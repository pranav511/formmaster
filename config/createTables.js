const db = require('./db'); // your promise-based pool connection

async function createTables() {
    
  try {
    // Create countries table
    await db.query(`
      CREATE TABLE IF NOT EXISTS countries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL
      )
    `);

    // Create states table
    await db.query(`
      CREATE TABLE IF NOT EXISTS states (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        countryId INT NOT NULL,
        FOREIGN KEY (countryId) REFERENCES countries(id) ON DELETE CASCADE
      )
    `);

    // Create users table
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        gender ENUM('Male','Female') NOT NULL,
        department VARCHAR(100) NOT NULL,
        countryId INT NOT NULL,
        stateId INT NOT NULL,
        address VARCHAR(255),
        profileImage VARCHAR(255),
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (countryId) REFERENCES countries(id) ON DELETE CASCADE,
        FOREIGN KEY (stateId) REFERENCES states(id) ON DELETE CASCADE
      )
    `);

    console.log('All tables created successfully!');
    process.exit(); // Close Node process
  } catch (error) {
    console.error('Error creating tables:', error.message);
    process.exit(1);
  }
}

createTables();
