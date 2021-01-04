import { Exam } from './singleSkill.model';
import { fullExam } from '../fullExams/fullExams.model';
// @route    POST api/exam/
// @desc     post an exam
// @access   public
export const postExam = async (req, res, next) => {
  try {
    const { title, type, duration, pdf_path, audio_path } = req.body;
    const exam = await Exam.find({ title: title, type: type, state: true });

    if (exam.length > 0) {
      res.status(404).send({ message: 'Đề thi đã tồn tại.' });
    } else {
      const exam = new Exam({
        title,
        type,
        duration,
        pdf_path,
        audio_path
      });
      await exam.save();
      res.status(200).json({ data: exam });
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: 'Error.' })
      .end();
  }
};

// @route    POST api/exam/
// @desc     post an exam with fullexam
// @access   public
export const postSingleSkill = async (req, res) => {
  try {
    const id = req.params.id;
    const FullExam = await fullExam.findById(id);

    const { type, pdf_path, audio_path, dapan } = req.body;
    const title = FullExam.title;

    const exams = new Exam({
      title,
      type,
      pdf_path,
      audio_path,
      full_exam: id,
      dapan
    });

    await exams.save();
    res.status(200).json({ data: exams });
  } catch (error) {
    return res.status(500).end();
  }
};

// @route    GET api/exam/
// @desc     Get all exam
// @access   Private
export const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find({ state: true }).select('-state');
    const sortedByCreatetionDate = exams.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.status(200).send(sortedByCreatetionDate);
  } catch (error) {
    console.error(error.message);
    res.status(400).end();
  }
};

// @route    GET api/exam/:id
// @desc     Get an exam
// @access   Private
export const getOneExam = async (req, res) => {
  try {
    const exam = await Exam.find({ _id: req.params.id, state: true }).select(
      '-state'
    );

    if (!exam) {
      res.status(404).send({ message: 'Invalid Document' });
    }
    res.status(200).json(exam);
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .send({ message: 'Error.' })
      .end();
  }
};

// @route    POST api/exam/:id
// @desc     update current exam
// @access   Private
export const updateExam = async (req, res) => {
  try {
    const { title, type, duration, pdf_path, audio_path } = req.body;
    let exam = await Exam.findById(req.params.id);
    if (!exam) {
      res.status(400).send({ message: 'Invalid document.' });
    } else {
      exam.title = title;
      exam.type = type;
      exam.duration = duration;
      exam.pdf_path = pdf_path;
      exam.audio_path = audio_path;
      await exam.save();
      res.status(200).send({ message: 'Updated.' });
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: 'Error.' })
      .end();
  }
};

// @route    DELETE api/exam/:id
// @desc     Delete current exam
// @access   Private
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
    res
      .status(400)
      .send({ message: 'Error.' })
      .end();
  }
};
