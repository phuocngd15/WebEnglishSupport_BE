import express from 'express';
import { json, urlencoded } from 'body-parser';
import fileupload from 'express-fileupload';
import fs from 'fs';

import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import { signup, signin, protect } from './router/account/auth';

import accountRouter from './router/account/account.router';
import examRouter from './router/singleSkill/singleSkill.router';
import profileRouter from './router/profile/profile.router';
import fullExamRouter from './router/fullexams/fullexam.router';
// import examHistoryRouter from './router/examHistory/examHistory.router';
import historyExamRecord from './router/historyExamRecord/historyExamRecord.router';
import { connect } from './router/share/db';
import uploadFileGG from './resources/uploadExam/fileExam.router';

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
app.use(fileupload());
app.use(morgan('dev'));

app.post('/signup', signup);
app.post('/signin', signin);
// app.use('/api', protect);

app.use('/api/account', accountRouter);
app.use('/api/exam', examRouter);
app.use('/api/fullExam', fullExamRouter);
app.use('/api/miniExam', fullExamRouter);
app.use('/api/profile', profileRouter);
app.use('/api/recordHistory', historyExamRecord);
// app.use('/api/examHistory', examHistoryRouter);
/* app.get('/pdf', (req, res) => {
  var file = fs.createReadStream(`public/upload/RC01.pdf`);
  file.pipe(res);
});
app.get('/audio', (req, res) => {
  var file = fs.createReadStream(`public/upload/TEST01.mp3`);
  file.pipe(res);
}); */

app.use('/api/gg', uploadFileGG);

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

// load de thi da xong
//