import config from '../../config';
import { User } from '../user/user.model';
import { Profile } from '../profile/profile.model';
import jwt from 'jsonwebtoken';
import { encrypt, decrypt } from './func';

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
    const existedUser = await User.findOne({ email: decrypt(email) });
    if (existedUser) {
      return res.status(400).send('Existed user');
    }
    const newAccount = {
      fullname: decrypt(fullname),
      email: decrypt(email),
      password: decrypt(password)
    };
    const user = await User.create(newAccount);
    const token = newToken(user);
    const newProfile = { user: user._id };
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
    // const emailDecrypt = decrypt(email);
    // const passDecrypt = decrypt(password);
    // const user = await User.findOne({ email: emailDecrypt }).exec();

    const emailDecrypt = (email);
    const passDecrypt = (password);
    const user = await User.findOne({ email: emailDecrypt }).exec();

    if (!user) {
      return res.status(401).send('sai email');
    }

    const match = await user.checkPassword(passDecrypt);

    if (!match) {
      return res.status(401).send('sai pass');
    }
    const token = newToken(user);
    console.log('new token', token);
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
    console.log('token payload', payload);
  } catch (e) {
    console.log(e);
    return res.status(401).end();
  }

  const user = await User.findById(payload.id)
    .select('-password')
    .lean()
    .exec();

  if (!user) {
    return res.status(401).end();
  }
  next();
};

export { newToken, verifyToken, signup, signin, protect, decrypt, encrypt };
