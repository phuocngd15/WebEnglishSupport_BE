import { Exam } from './exam.model';
import path from 'path';
import e from 'express';


export const postExam = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.file);
    const { title, type } = req.body;
    const exam = await Exam.find({ title: title, state: true });

    if (exam) {
      res.status(404).send({ message: 'Đề thi đã tồn tại.' });
    }
    else {
      const { path, mimetype } = req.file;
      const exam = new Exam({
        title,
        type,
        file_path: path,
        file_mimetype: mimetype
      });
      await exam.save();
      res.status(200).json({ data: exam });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Error.' }).end();
  }
};

export const getAllFiles = async (req, res) => {
  try {
    const exams = await Exam.find({ state: true }).select('-state');
    const sortedByCreattionDate = exams.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.status(200).send(sortedByCreattionDate);
  } catch (error) {
    console.error(e);
    res.status(400).end();
  }
}

export const getOneExam = async (req, res) => {
  try {
    const exam = await Exam.find({ _id: req.params.id, state: true }).select('-state');

    if (!exam) {
      res.status(404).send({ message: 'Invalid Document' });
    }
    res.status(200).send({ data: exam });

  } catch (error) {
    console.error(error.message);
    res.status(400).send({ message: 'Error.' }).end();
  }
}

export const updateExam = async (req, res) => {
  try {
    const { title, type } = req.body;
    const { path, mimetype } = req.file;
    let exam = await Exam.findById(req.params.id);
    if (!exam) {
      res.status(400).send({ message: 'Invalid document.' });
    } else {
      exam.title = title;
      exam.type = type;
      exam.file_path = path;
      exam.file_mimetype = mimetype;
      await exam.save();
      res.status(200).send({ message: "Updated." })
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: 'Error.' }).end();
  }
}

export const deleteExam = async (req, res, next) => {
  try {
    let exam = await Exam.findById(req.params.id);
    if (!exam) {
      res.status(400).send({ message: 'Invalid document.' });
    } else {
      exam.state = false;
      await exam.save();
      res.status(200).send({ message: 'Deleted.' });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: 'Error.' }).end();
  }
}