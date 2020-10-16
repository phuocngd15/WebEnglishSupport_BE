import config from '../../config';
import { User } from '../user/user.model';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
const decrypt = value => {
  const bytes = CryptoJS.AES.decrypt(value, 'SecretPassphrase'); // SecretPassphrase can handle by server
  return bytes.toString(CryptoJS.enc.Utf8);
};
const encrypt = value => {
  return CryptoJS.AES.encrypt(value, 'SecretPassphrase').toString();
};

const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
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
    const newAccount = {
      fullname: decrypt(fullname),
      email: decrypt(email),
      password: decrypt(password)
    };
    console.log(newAccount);
    const user = await User.create(newAccount);
    const token = newToken(user);
    return res.status(201).send({ token });
  } catch (e) {
    return res.status(500).end();
  }
};

const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'need email and password' });
  }

  const invalid = { message: 'Invalid email and passoword combination' };

  try {
    const emaildecypted = decrypt(req.body.email);
    const passdecypted = decrypt(req.body.password);
    console.log(emaildecypted);
    console.log(passdecypted);
    const user = await User.findOne({ email: emaildecypted })
      .select('email password rule')
      .exec();

    if (!user) {
      return res.status(401).send(invalid);
    }

    const match = await user.checkPassword(passdecypted);

    if (!match) {
      return res.status(401).send(invalid);
    }
    console.log(user);
    const token = newToken(user);
    return res
      .status(201)
      .send([token, encrypt(user.email), encrypt(user.rule)]);
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
  } catch (e) {
    return res.status(401).end();
  }

  const user = await User.findById(payload.id)
    .select('-password')
    .lean()
    .exec();

  if (!user) {
    return res.status(401).end();
  }

  req.user = user;
  next();
};
export { newToken, verifyToken, signup, signin, protect, decrypt, encrypt };
