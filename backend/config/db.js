import path from 'path';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const databaseFile = path.join(__dirname, '..', 'database', 'gym.db');

sqlite3.verbose();
const db = new sqlite3.Database(databaseFile, (err) => {
  if (err) {
    console.error('SQLite connection error:', err.message);
    throw err;
  }
  console.log('Connected to SQLite database.');
});

export default db;
