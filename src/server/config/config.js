import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../helpers/logger';
import seedDb from '../seeder/seedController';

dotenv.config();

const mongoConfig = () => {
  mongoose.Promise = global.Promise;
  const url = process.env.MONGO_URL;
  mongoose.connect(
    url,
    { useNewUrlParser: true, useCreateIndex: true }
  );

  const db = mongoose.connection;
  db.once(
    'open',
    () => logger.info({ message: 'Connection to the database is secured' }),
    seedDb()
  );
  db.on('error', () => logger.error({ message: 'Database connection error' }));
};

export default mongoConfig;
