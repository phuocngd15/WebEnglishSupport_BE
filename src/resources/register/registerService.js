const Account = require('./registerModel');

exports.getAll = async function(account, err) {
  try {
    let accAll = await Account.find(account);
    return accAll;
  } catch (error) {
    throw error;
  }
};
exports.postAccount = async function(account, err) {
  try {
    let acc = await Account.create(account);
    return acc;
  } catch (error) {
    throw error;
  }
};
exports.getAccount = async function(id, err) {
  try {
    let acc = await Account.findById(id);
    return acc;
  } catch (error) {
    throw error;
  }
};
exports.updateAccount = async function(account, err) {
  try {
    let acc = await Account.findByIdAndUpdate(account, account.id);
    Account.save();
    return acc;
  } catch (error) {
    throw error;
  }
};
