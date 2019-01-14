import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from './helpers/logger';
import mongoConfig from './config/config';
import userRoute from './routes/userRoutes';

mongoConfig();
dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/api', (req, res) => {
  res.json({
    status: 'success',
    message: 'Welcome to Capstone'
  });
});

app.use('/api', userRoute);

app.all('/api*', (req, res) => {
  res.json({
    status: 'Failed',
    message: 'Api has no match, redirect to /api'
  });
});

app.listen(port, () =>
  logger.info({
    message: `server started on port ${port}`
  })
);

export default app;
