const Service = require('./registerService');

exports.getAllAccounts = async function (req, res, next) {
    try {
        let accounts = await Service.getAll({}, next)
        return res.status(200).json({ status: 200, data: accounts, message: "Succesfully Users Retrieved" });
    } catch (error) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
exports.postAccount = async function (req, res, next) {
    try {
        let account = await Service.postAccount(req.body, next)
        return res.status(200).json({ status: 200, data: account, message: "Succesfully Users Retrieved" });
    } catch (error) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
