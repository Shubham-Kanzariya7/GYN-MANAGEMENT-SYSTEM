import sequelize from '../config/db.js';
import * as migration from './migrations/20260603-initial-schema.js';

async function run() {
  try {
    await sequelize.authenticate();
    await migration.up({ context: sequelize });
    console.log('Migrations applied successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

run();
