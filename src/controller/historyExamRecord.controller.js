import { HistoryExamRecord } from '../model/historyExamRecord.model';
import { format } from 'date-fns';

export const submitExam = async (req, res) => {
  const { score, _examId, account } = req.body;
  if (!_examId || !account) res.status(401).end();

  const newRecord = {
    fullExamId: _examId,
    accountId: account._id,
    score: score
  };

  const result = await HistoryExamRecord.create(newRecord);
  if (!result) res.status(401).end();
  res.status(200).json('mess:ok');
};

export const getAnalyzeByEmail = async (req, res) => {
  const { account } = req.body;
  const { dateTime } = req.query;
  const convertDateTime = new Date(dateTime);

  if (!account) res.status(401).end();

  const month = convertDateTime.getMonth();
  const year = convertDateTime.getFullYear();

  const calculate = async (month, year) => {
    let date = new Date(year, month, 1);
    const labelDate = [];
    const values = [];
    while (date.getMonth() === month) {
      const fomatedDate = new Date(date);
      const { avgScore } = await getSumScoreByDate(account._id, fomatedDate);
      labelDate.push(format(new Date(date), 'dd/MM/yy'));
      values.push(avgScore);
      date.setDate(date.getDate() + 1);
    }
    return { labelDate, values };
  };

  const { labelDate, values } = await calculate(month, year);
  console.log('labelDate', labelDate);
  console.log('values', values);
  res.status(200).send({ labelDate: labelDate, values: values });
};

const getSumScoreByDate = async (accountId, date) => {
  let sumScore = 0;
  const result = await HistoryExamRecord.find({
    accountId: accountId,
    createdAt: { $gte: date, $lt: addDays(date, 1) }
  }).select(' -__v');

  if (result) {
    result.forEach(e => {
      sumScore = sumScore + e.score;
    });
    const scoreModelByDate = {
      date: date,
      avgScore: sumScore / result.length
    };
    return scoreModelByDate;
  }
  return null;
};

const addDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
