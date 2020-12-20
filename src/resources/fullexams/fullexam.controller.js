import { fullExam } from './fullexam.model';

// @route    POST api/fullexams/
// @desc     create fullexam // 2 m
// @access   public

export const postFullExam = async (req, res, next) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const fullexam = await fullExam.find({ title: title, state: true });

    if (fullexam.length > 0) {
      return res.status(404).send({ message: 'Đề thi đã tồn tại.' });
    } else {
      const fullexam = new fullExam({
        title,
        description
      });
      await fullexam.save();
      return res.status(200).json({ data: fullexam });
    }
  } catch (error) {
    console.log(error.message);
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
