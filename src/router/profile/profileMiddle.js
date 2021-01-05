import { decrypt } from '../share/func';
import { Account } from '../../model/account.model';

export default async function(req, res, next) {
  const { email } = req.body;
  console.log('req.body', req);
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
  console.log('req.body.account', req.body.account);
  next();
}
