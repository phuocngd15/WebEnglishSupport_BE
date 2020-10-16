import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import { signup, signin, protect } from './resources/share/auth';

import cardRouter from './resources/cards/card.router';
import userRouter from './resources/user/user.router';
import { connect } from './resources/share/db';
import config from './config';
export const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(json());
app.use(
  urlencoded({
    extended: true
  }) // alow use parameter when req
);
app.use(morgan('dev'));

app.post('/signup', signup);
app.post('/signin', signin);

app.use('/api', protect);

app.use('/api/user', userRouter);
app.use('/api/card', cardRouter);

export const start = async () => {
  try {
    await connect();
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`);
    });
  } catch (e) {
    console.error(e);
  }
};
