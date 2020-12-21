import { Account } from './account.model';
import { decrypt } from '../share/func';
import { Profile } from '../profile/profile.model';

export const oneAccountByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const acc = await Account.find({ email }).exec();
    res.status(200).json({ data: acc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};
export const allAcc = async (req, res) => {
  try {
    const accs = await Account.find({}).exec();
    res.status(200).json({ data: accs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const updateOneAcc = async (req, res) => {
  try {
    const user = await Account.findByIdAndUpdate(req.user._id, req.body, {
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
export const postPass = async (req, res) => {
  /*   try {
    const { value, email } = req.body;
    const filter = { accountId: account._id };
    const update = { fullname: value };
    const profile = await Profile.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
      rawResult: true
    });
    return res.status(201).send('update name succsess');
  } catch (err) {
    return res.status(500).send('Server Error');
  } */
  return res.status(500).send('Server Error');
};
//Truc
export const getUserByRule = async (req, res) => {
  try {
    const rule = req.params.rule;
    const getUser = await Account.find({ rule: rule });
    return res.status(200).json(getUser);
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};
export const getClient = async (req, res) => {
  try {
    let rule = 4;
    const getClient = await Account.find({ rule: rule });
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
    const { fullname, email, password, rule } = req.body;
    const existedUser = await Account.findOne({ email: email, rule: rule });
    if (existedUser) {
      return res.status(404).send('Existed user');
    }
    const newAccount = {
      fullname: decrypt(fullname),
      email: decrypt(email),
      password: decrypt(password),
      rule: decrypt(rule)
    };

    const account = await Account.create(newAccount);
    const newProfile = { accountId: account._id, fullname: decrypt(fullname) };
    await Profile.create(newProfile);

    return res.status(200).json(account);
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    await Account.findByIdAndDelete(id);
    const profile = await Profile.findOne({ accountId:id})
    return res.status(200).send('OK');
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};
