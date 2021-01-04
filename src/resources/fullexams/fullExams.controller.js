import { FULL_TEST_ANSWER_SHEET } from './examAnswerSheet';
import { fullExam } from './fullExams.model';

// @route    POST api/fullexams/
// @desc     create fullexam // 2 m
// @access   public

export const postFullExam = async (req, res, next) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const existedFullExam = await fullExam.findOne({
      title: title,
      state: true
    });

    if (existedFullExam) {
      return res.status(201).send({
        infoMessage: 'Đề thi đã tồn tại.',
        isContinue: false,
        type: 'Error'
      });
    } else {
      const fullexam = new fullExam({
        title,
        description
      });
      await fullexam.save();
      return res.status(200).json({ data: fullexam });
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: 'Error.' })
      .end();
  }
};

// @route    POST api/fullexam/:id
// @desc     update exam_id
// @access   public
/* export const updateFullExamWithExam = async (req, res) => {
  const newFullExam = {};
  newFullExam.title = req.body.title;
  newFullExam.description = req.body.description;
  if (typeof req.body.exam_id !== 'undefined') {
    newFullExam.exam_id = req.body.exam_id.split(',');
  }

  fullExam.findById(req.params.id).then(data => {
    if (data) {
      fullExam
        .findByIdAndUpdate(
          { _id: req.params.id },
          { $set: newFullExam },
          { new: true }
        )
        .then(data => res.json(data));
    }
  });

  res.send(newFullExam);
}; */

// @route    GET api/fullexam/
// @desc     get all fullexam
// @access   public
export const getAll = async (req, res) => {
  try {
    const fullexam = await fullExam.find({ state: true }).select('-state');
    const sortedByCreattionDate = fullexam.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    return res.status(200).json(sortedByCreattionDate);
  } catch (error) {
    console.error(error.message);
    return res.status(400).end();
  }
};

// @route    GET api/fullexam/:id
// @desc     get all fullexam
// @access   public
export const getOne = async (req, res) => {
  try {
    const fullexam = await fullExam
      .findById({ _id: req.params.id, state: true })
      .select('-state')
      .populate({ path: 'examRef', select: 'title dapan' });

    if (!fullexam) {
      res.status(404).send({ message: 'Invalid Document' });
    }
    res.status(200).json(fullexam);
  } catch (error) {
    console.error(error.message);
    res.status(400).end();
  }
};

export const getListFullExams = async (req, res) => {
  res.status(200).json({
    listExam: [
      { _id: 1, title: 'Đề thi số 1' },
      { _id: 2, title: 'Đề thi số 2' },
      { _id: 3, title: 'Đề thi số 3' },
      { _id: 4, title: 'Đề thi số 4' },
      { _id: 5, title: 'Đề thi số 5' }
    ]
  });
};

export const getOneFullExams = async (req, res) => {
  res.status(200).json({
    _id: req.query.id,
    title: `Đề thi số ${req.query.id}`,
    answerSheet: FULL_TEST_ANSWER_SHEET
  });
};
