const sqlite3 = require('sqlite3').verbose();
 const db = new sqlite3.Database(':memory:');
 db.serialize(() => {
  // Users table
  db.run(`
    CREATE TABLE users (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      role TEXT,
      credits REAL
    )
 `);
  // Tasks table
  db.run(`
    CREATE TABLE tasks (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      platform TEXT,
      action_type TEXT,
 quantity INTEGER,
      target_url TEXT,
      status TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
 `);
  // Insert demo data
 db.run(`INSERT INTO users (username, password, role, credits) VALUES (?, ?, ?, ?)`,
    ['admin', 'admin123', 'admin', 1000]);
 db.run(`INSERT INTO users (username, password, role, credits) VALUES (?, ?, ?, ?)`,
    ['user1', 'pass123', 'user', 100]);
 });
 module.exports = db;