import { Profile } from './profile.model';
import { User } from '../user/user.model';
// @route    GET api/profile/
// @desc     Get current users profile
// @access   Private
export const getOneProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user._id
    }).populate('user', ['fullname', 'email', 'password']);
    if (!profile) return res.status(400).json({ msg: 'Profile not found' });
    return res.json(profile);
  } catch (err) {
    return res.status(500).json({ msg: 'Server error' });
  }
};

// @route    POST api/profile/me
// @desc     Create or update user profile
// @access   Private
export const postProfile = async (req, res) => {
  try {
    const { gender, phone, level } = req.body;
    const profileFields = {
      user: req.user._id,
      gender: gender,
      phone: phone,
      level: level
    };
    // Using upsert option (creates new doc if no match is found):
    let profile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $set: profileFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return res.json(profile);
  } catch (err) {
    return res.status(500).send('Server Error');
  }
};
