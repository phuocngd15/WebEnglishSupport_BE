import config from '../../config';
import { Account } from '../account/account.model';
import { Profile } from '../profile/profile.model';
import jwt from 'jsonwebtoken';
import { encrypt, decrypt } from './func';

const newToken = account => {
  return jwt.sign({ id: account.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  });
};

const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

const signup = async (req, res) => {
  try {
    const { email, password, fullname } = req.body;
    if (!email || !password) {
      return res.status(201).send({
        infoMessage: 'Need email and password',
        isContinue: false,
        type: 'error'
      });
    }

    const existedAccount = await Account.findOne({ email: decrypt(email) });
    if (existedAccount) {
      return res.status(201).send({
        infoMessage: 'Tài khoản đã tồn tại',
        isContinue: false,
        type: 'error'
      });
    }
    const newAccount = {
      fullname: decrypt(fullname),
      email: decrypt(email),
      password: decrypt(password)
    };
    const account = await Account.create(newAccount);
    const token = newToken(account);

    const newProfile = { accountId: account._id, fullname: decrypt(fullname) };
    await Profile.create(newProfile);

    return res
      .status(201)
      .send([{ tk: token }, encrypt(account.email), encrypt(account.rule)]);
  } catch (e) {
    return res.status(500).end();
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!decrypt(email) || !decrypt(password)) {
      return res.status(201).send({
        infoMessage: 'nhập đủ email và mật khẩu',
        isContinue: false,
        type: 'error'
      });
    }

    const emailDecrypt = decrypt(email);
    const passDecrypt = decrypt(password);

    const account = await Account.findOne({ email: emailDecrypt }).exec();

    if (!account) {
      return res.status(201).send({
        infoMessage: 'email hoặc mật khẩu sai',
        isContinue: false,
        type: 'error'
      });
    }

    const match = await account.checkPassword(passDecrypt);
    if (!match) {
      return res.status(201).send({
        infoMessage: 'email hoặc mật khẩu sai',
        type: 'error',
        isContinue: false
      });
    }
    const token = newToken(account);
    return res
      .status(201)
      .send([{ tk: token }, encrypt(account.email), encrypt(account.rule)]);
  } catch (e) {
    res.status(500).end();
  }
};

const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end();
  }
  const token = bearer.split('Bearer ')[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).end();
  }

  const user = await Account.findById(payload.id)
    .select('-password')
    .lean()
    .exec();

  if (!user) {
    return res.status(401).end();
  }
  next();
};

export { newToken, verifyToken, signup, signin, protect, decrypt, encrypt };
