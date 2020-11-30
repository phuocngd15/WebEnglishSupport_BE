import { Profile } from './profile.model'
import { User } from '../user/user.model'
// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
export const getOneProfile = async (req, res) => {
  console.log(req.params.id)
  try {
    const profile = await Profile.findOne({
      user: req.params.id
    }).populate('user', ['fullname', 'email', 'password'])

    if (!profile) return res.status(400).json({ msg: 'Profile not found' })

    return res.json(profile)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ msg: 'Server error' })
  }
}

// @route    POST api/profile/me
// @desc     Create or update user profile
// @access   Private
export const postProfile = async (req, res) => {
  try {
    const { user, gender, phone, level } = req.body
    const id = req.params.id
    const profileFields = {
      // user: req.user.id,
      user: user,
      gender: gender,
      phone: phone,
      level: level
    }
    console.log(profileFields)
    return res.json(1)
    // Using upsert option (creates new doc if no match is found):
    // let profile = await Profile.findOneAndUpdate(
    //     // { user: req.user.id },
    //     { user: req.params.id },
    //     { $set: profileFields },
    //     { new: true, upsert: true, setDefaultsOnInsert: true }
    // );
    // return res.json(profile);
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error')
  }
}

// // @route    GET api/profile/me
// // @desc     Get current users profile
// // @access   Private
// export const putProfile = async (req, res) => {
//     const {
//         gender,
//         phone,
//         level
//     }
//     const profile = {
//         gender,
//         phone,
//         level
//     };

//     try {
//         const profile = await Profile.findOne({ user: req.user.id });
//         await profile.save();
//         res.json(profile);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// }
