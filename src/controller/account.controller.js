import { Account } from '../model/account.model';
import { decrypt } from '../router/share/func';
import { Profile } from '../model/profile.model';

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
    const accs = await Account.find({ state: true }).exec();
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
export const getUserByRule = async (req, res) => {
  try {
    const rule = req.params.rule;
    const getUser = await Account.find({ rule: rule, state: true });
    return res.status(200).json(getUser);
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
    res.status(400).end();
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;

    const filter = { _id: id };
    const update = { state: false };
    await Account.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
      rawResult: true
    });
    await Profile.findOneAndUpdate(id, update, {
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
    res.status(400).end();
  }
};
export const recoverPass = async (req, res) => {
  try {
    const { email } = req.query;
    const account = await Account.findByIdAndDelete({ email: decrypt(email) });
    if (!account)
      return res
        .status(200)
        .send({ infoMessage: 'email không tồn tại', type: 'error' });
    return res.status(200).send('OK');
  } catch (e) {
    res.status(400).end();
  }
};
