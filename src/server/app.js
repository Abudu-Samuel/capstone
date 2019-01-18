import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
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
app.use(express.static('dist'));

app.get('/api', (req, res) => {
  res.json({
    status: 'Success',
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

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'));
});

app.listen(port, () =>
  logger.info({
    message: `server started on port ${port}`
  })
);

export default app;
