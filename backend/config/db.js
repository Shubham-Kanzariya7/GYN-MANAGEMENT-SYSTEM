import path from 'path';
import { fileURLToPath } from 'url';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const databaseFile = path.join(__dirname, '..', 'database', process.env.SQLITE_DB_FILE || 'gym.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: databaseFile,
  logging: false,
});

export default sequelize;
