import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import { signup, signin, protect } from './resources/share/auth';

import cardRouter from './resources/cards/card.router';
import accountRouter from './resources/account/account.router';
import examRouter from './resources/exam/exam.router';
import cardSound from './resources/cardSound/cardSound.router';
import profileRouter from './resources/profile/profile.router';
import fullExamRouter from './resources/fullexams/fullexam.router';

import { connect } from './resources/share/db';
import config from './config';
export const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(json());
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(
  urlencoded({
    extended: true
  }) // alow use parameter when req
);
app.use(morgan('dev'));

app.post('/signup', signup);
app.post('/signin', signin);
// app.use('/api', protect);

app.use('/api/account', accountRouter);
app.use('/api/card', cardRouter);
app.use('/api/exam', examRouter);
app.use('/api/fullexam', fullExamRouter);
app.use('/api/profile', profileRouter);
app.use('/cardSound', cardSound);

export const start = async () => {
  try {
    await connect();
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api/`);
    });
  } catch (e) {
    console.error(e);
  }
};
