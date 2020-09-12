const Account = require('./registerModel');


exports.getAll = async function (account, err) {
    try {
        let accAll = await Account.find(account);
        return accAll;
    } catch (e) {
        throw e;
    }
};
exports.postAccount = async function(account, err){
    try {
        let acc = await Account.create(account);
        return acc;
    } catch (error) {
        throw e;
    }
}

