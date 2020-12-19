import { User } from './user.model';
import { decrypt } from '../share/func';
import { Profile } from '../profile/profile.model';

export const oneUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.find({ email }).exec();
    res.status(200).json({ data: user });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};
export const allUser = async (req, res) => {
  try {
    const user = await User.find({}).exec();
    res.status(200).json({ data: user });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const updateOneUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true
    })
      .lean()
      .exec();
    res.status(200).json({ data: user });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

//Truc
export const getUserByRule= async (req, res) => {
  try {
    const rule = req.params.rule
    const getUser = await User.find({ rule: rule });
    if (!getUser) {
      return res.status(404).send({ message: 'Invalid Document' });
    }
    return res.status(200).json(getUser);
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};
export const getClient = async (req, res) => {
  try {
    let rule = 4
    const getClient = await User.find({ rule: rule });
    if (!getClient) {
      return res.status(404).send({ message: 'Invalid Document' });
    }
    return res.status(200).json(getClient);
  } catch (e) {
    res.status(400).end();
  }
};
export const postAdmin = async (req, res) => {
  try {
    const { fullname, email, password, rule } = req.body

    const existedUser = await User.findOne({ email: email, rule: rule });

    if (existedUser) {
      return res.status(404).send('Existed user');
    }
    const newAccount = {
      fullname: decrypt(fullname),
      email: decrypt(email),
      password: decrypt(password),
      rule: decrypt(rule)
    };

    const user = await User.create(newAccount);
    const newProfile = { user: user._id };
    await Profile.create(newProfile);

    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
}

export const deleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    return res.status(200).send("OK");

  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
}