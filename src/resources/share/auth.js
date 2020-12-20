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
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'need email and password' });
  }

  try {
    console.log(req.body);
    const { fullname, email, password } = req.body;
    const existedAccount = await Account.findOne({ email: decrypt(email) });
    if (existedAccount) {
      return res.status(400).send('Existed user');
    }
    const newAccount = {
      email: decrypt(email),
      password: decrypt(password)
    };
    const account = await Account.create(newAccount);
    const token = newToken(account);
    const newProfile = { accountId: account._id, fullname: decrypt(fullname) };
    await Profile.create(newProfile);

    return res.status(201).send({ token });
  } catch (e) {
    return res.status(500).end();
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Truc
    const emailDecrypt = decrypt(email);
    const passDecrypt = decrypt(password);
    const account = await Account.findOne({ email: emailDecrypt }).exec();
    console.log('account', account);
    /* const emailDecrypt = (email);
    const passDecrypt = (password);
    const user = await User.findOne({ email: emailDecrypt }).exec(); */

    if (!account) {
      return res.status(401).send('sai email');
    }

    const match = await account.checkPassword(passDecrypt);

    if (!match) {
      return res.status(401).send('sai pass');
    }
    const token = newToken(account);
    console.log('new token', token);
    return res
      .status(201)
      .send([token, encrypt(account.email), encrypt(account.rule)]);
  } catch (e) {
    console.error(e);
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
    console.log('token payload', payload);
  } catch (e) {
    console.log(e);
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
