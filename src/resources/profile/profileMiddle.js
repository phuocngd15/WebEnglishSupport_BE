import { decrypt } from '../share/func';
import { Account } from './profile.model';

export default async function(req, res, next) {
  console.log('middle profile', req.body);
  console.log('middle profile', req.body);
  const { email } = req.body;
  if (!email) {
    return res.status(400).end();
  }
  const account = await Account.findOne({ email: decrypt(email) })
    .select('-password')
    .lean()
    .exec();

  if (!account) {
    return res.status(400).end();
  }
  req.body.account = account;
  next();
}
