import { fullExam } from '../model/fullexam.model';
import { singleSkill } from '../model/singleSkill.model';

// upload de khop voi gg
// get de khop voi gg

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
      return res.status(200).json(fullexam);
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .send({ message: 'Error.' })
      .end();
  }
};

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
  console.log('aaaaaaa');

  try {
    const fullexam = await fullExam
      .findById({ _id: req.params.id, state: true })
      .select('-state')
      .populate({ path: 'examRef', select: 'title dapan pdf_path audio_path' });

    if (!fullexam) {
      res.status(404).send({ message: 'Invalid Document' });
    }
    console.log(fullexam);
    res.status(200).json(fullexam);
  } catch (error) {
    console.error(error.message);
    res.status(400).end();
  }
};

export const deleteFullExam = async (req, res) => {
  try {
    const id = req.params.id;

    const filter = { _id: id };
    const filterExam = { full_exam: id };

    const update = { state: false };
    await fullExam.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
      rawResult: true
    });
    await singleSkill.findOneAndUpdate(filterExam, update, {
      new: true,
      upsert: true,
      rawResult: true
    });

    return res.status(200).send({
      infoMessage: 'Xóa tài khoản thành công',
      isContinue: true,
      type: 'success'
    });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

export const getOneExamGG = async (req, res) => {
  try {
    console.log('req.query', req.query);
    let fullexam = await fullExam
      .findById({ _id: req.query.id, state: true })
      .select('-state')
      .populate({ path: 'examRef', select: 'title dapan pdf_path audio_path' });

    if (!fullexam) {
      res.status(404).send({ message: 'Invalid Document' });
    }
    console.log('te', fullexam);
    res.status(200).json(fullexam);
  } catch (error) {
    console.error(error.message);
    res.status(400).end();
  }
};
