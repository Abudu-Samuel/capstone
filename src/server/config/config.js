import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../helpers/logger';

dotenv.config();

const mongoConfig = () => {
  mongoose.Promise = global.Promise;
  const url = process.env.MONGO_URL;
  mongoose.connect(
    url,
    { useNewUrlParser: true }
  );

  const db = mongoose.connection;
  db.once('open', () => logger.info({ message: 'Connection to the database is secured' }));
  db.on('error', () => logger.error({ message: 'Database connection error' }));
};

export default mongoConfig;
