import { decrypt } from '../share/func';
import { Account } from '../account/account.model';

export default async function(req, res, next) {
  console.log('middle profile', req.query);
  const { email } = req.query;
  if (!email) {
    return res.status(401).end();
  }
  const account = await Account.findOne({ email: decrypt(email) })
    .select('-password')
    .exec();

  if (!account) {
    return res.status(401).end();
  }
  req.body.account = account;
  next();
}
