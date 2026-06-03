import dotenv from 'dotenv';
import db from '../models/index.js';
import seedInitialData from './seeders/seedInitialData.js';

dotenv.config();

async function run() {
  try {
    await db.sequelize.authenticate();
    await seedInitialData(db);
    console.log('Seed data inserted successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seeder failed:', error);
    process.exit(1);
  }
}

run();
