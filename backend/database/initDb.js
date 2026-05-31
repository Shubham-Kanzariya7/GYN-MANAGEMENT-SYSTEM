import bcrypt from 'bcryptjs';
import db from '../config/db.js';

const adminPassword = 'Admin@123';
const trainerPassword = 'Trainer@123';
const memberPassword = 'Member@123';

function runQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

function getQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

export async function initDatabase() {
  await runQuery(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    phone TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  )`);

  await runQuery(`CREATE TABLE IF NOT EXISTS membership_plans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    duration INTEGER NOT NULL,
    price REAL NOT NULL,
    benefits TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  )`);

  await runQuery(`CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    gender TEXT,
    dob TEXT,
    address TEXT,
    membershipPlan TEXT,
    joiningDate TEXT,
    expiryDate TEXT,
    height REAL,
    weight REAL,
    photo TEXT,
    status TEXT DEFAULT 'active',
    trainerId INTEGER,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(trainerId) REFERENCES trainers(id)
  )`);

  await runQuery(`CREATE TABLE IF NOT EXISTS trainers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    specialty TEXT,
    salary REAL DEFAULT 0,
    photo TEXT,
    status TEXT DEFAULT 'active',
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  )`);

  await runQuery(`CREATE TABLE IF NOT EXISTS attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    memberId INTEGER NOT NULL,
    trainerId INTEGER,
    date TEXT NOT NULL,
    status TEXT DEFAULT 'present',
    notes TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(memberId) REFERENCES members(id),
    FOREIGN KEY(trainerId) REFERENCES trainers(id)
  )`);

  await runQuery(`CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    memberId INTEGER NOT NULL,
    amount REAL NOT NULL,
    paymentDate TEXT NOT NULL,
    method TEXT,
    status TEXT DEFAULT 'paid',
    notes TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(memberId) REFERENCES members(id)
  )`);

  await runQuery(`CREATE TABLE IF NOT EXISTS schedules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    trainerId INTEGER NOT NULL,
    title TEXT NOT NULL,
    startTime TEXT NOT NULL,
    endTime TEXT NOT NULL,
    description TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(trainerId) REFERENCES trainers(id)
  )`);

  const admin = await getQuery('SELECT id FROM users WHERE email = ?', ['admin@gym.com']);
  if (!admin) {
    const hashedAdmin = await bcrypt.hash(adminPassword, 10);
    await runQuery(
      'INSERT INTO users (fullName, email, password, role, phone) VALUES (?, ?, ?, ?, ?)',
      ['Administrator', 'admin@gym.com', hashedAdmin, 'admin', '0000000000']
    );
  }

  const trainer = await getQuery('SELECT id FROM users WHERE email = ?', ['trainer@gym.com']);
  if (!trainer) {
    const hashedTrainer = await bcrypt.hash(trainerPassword, 10);
    await runQuery(
      'INSERT INTO users (fullName, email, password, role, phone) VALUES (?, ?, ?, ?, ?)',
      ['Lead Trainer', 'trainer@gym.com', hashedTrainer, 'trainer', '0000000001']
    );
  }

  const member = await getQuery('SELECT id FROM users WHERE email = ?', ['member@gym.com']);
  if (!member) {
    const hashedMember = await bcrypt.hash(memberPassword, 10);
    await runQuery(
      'INSERT INTO users (fullName, email, password, role, phone) VALUES (?, ?, ?, ?, ?)',
      ['Gym Member', 'member@gym.com', hashedMember, 'member', '0000000002']
    );
  }

  console.log('Database initialization complete.');
}
