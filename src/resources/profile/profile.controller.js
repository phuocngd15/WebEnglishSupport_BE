import { Profile } from './profile.model';

export const getOneProfile = async (req, res) => {
  try {
    const { account } = req.body;

    const profile = await Profile.findOne({
      accountId: account._id
    })
      .select('-password')
      .exec();

    if (!profile)
      return res
        .status(202)
        .json({ infoMessage: 'Profile not found', type: 'error' });
    return res.status(201).json(profile);
  } catch (err) {
    return res.status(500).json({ infoMessage: 'Server error' });
  }
};

export const postPhone = async (req, res) => {
  try {
    const { value, account } = req.body;
    const filter = { accountId: account._id };
    const update = { phone: value };
    await Profile.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
      rawResult: true
    });
    return res
      .status(200)
      .json({ infoMessage: 'cập nhật SĐT thành công', isContinue: true });
  } catch (err) {
    return res.status(500).send('Server Error');
  }
};

export const postName = async (req, res) => {
  try {
    const { value, account } = req.body;
    const filter = { accountId: account._id };
    const update = { fullname: value };
    await Profile.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
      rawResult: true
    });
    return res
      .status(200)
      .json({ infoMessage: 'cập nhật tên thành công', isContinue: true });
  } catch (err) {
    return res.status(500).send('Server Error');
  }
};

export const postGender = async (req, res) => {
  try {
    const { value, account } = req.body;
    const filter = { accountId: account._id };
    const update = { gender: value };
    await Profile.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
      rawResult: true
    });
    return res
      .status(200)
      .json({ infoMessage: 'cập giới tính thành công', isContinue: true });
  } catch (err) {
    return res.status(500).send('Server Error');
  }
};

export const postPass = async (req, res) => {
  try {
    const { value, account } = req.body;
    const filter = { accountId: account._id };
    const update = { pass: value };
    await Profile.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
      rawResult: true
    });
    return res
      .status(200)
      .json({ infoMessage: 'cập mật khẩu thành công', isContinue: true });
  } catch (err) {
    return res.status(500).send('Server Error');
  }
};
