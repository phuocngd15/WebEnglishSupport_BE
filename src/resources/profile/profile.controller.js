import { Profile } from './profile.model';
import { Account } from '../account/account.model';
// @route    GET api/profile/
// @desc     Get current users profile
// @access   Private
export const getOneProfile = async (req, res) => {
  try {
    const { account } = req.body;

    const profile = await Profile.findOne({
      accountId: account._id
    })
      .select('-password')
      .exec();

    if (!profile) return res.status(400).json({ message: 'Profile not found' });
    return res.json(profile);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// @route    POST api/profile/me
// @desc     Create or update user profile
// @access   Private
export const postPhone = async (req, res) => {
  try {
    const { value, account } = req.body;
    const filter = { accountId: account._id };
    const update = { phone: value };
    const profile = await Profile.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
      rawResult: true
    });
    return res.status(201).json({ message: 'update phone succsess' });
  } catch (err) {
    return res.status(500).send('Server Error');
  }
};
export const postName = async (req, res) => {
  try {
    const { value, account } = req.body;
    const filter = { accountId: account._id };
    const update = { fullname: value };
    const profile = await Profile.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
      rawResult: true
    });
    return res.status(201).json({ message: 'update name succsess' });
  } catch (err) {
    return res.status(500).send('Server Error');
  }
};
export const getName = async (req, res) => {
  try {
    const { account } = req.body;
    const filter = { accountId: account._id };
    const profile = await (await Profile.findOne(filter)).exec();
    return res.status(201).json(profile);
  } catch (err) {
    return res.status(500).send('Server Error');
  }
};
export const postGender = async (req, res) => {
  try {
    const { value, account } = req.body;
    const filter = { accountId: account._id };
    const update = { gender: value };
    const profile = await Profile.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
      rawResult: true
    });
    return res.status(201).json({ message: 'update gender succsess' });
  } catch (err) {
    return res.status(500).send('Server Error');
  }
};
export const postPass = async (req, res) => {
  try {
    const { value, account } = req.body;
    const filter = { accountId: account._id };
    const update = { pass: value };
    const profile = await Profile.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
      rawResult: true
    });
    return res.status(201).json({ message: 'update pass succsess' });
  } catch (err) {
    return res.status(500).send('Server Error');
  }
};
