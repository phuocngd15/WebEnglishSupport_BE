const Service = require('./registerService')

exports.getAllAccounts = async function(req, res, next) {
  try {
    const accounts = await Service.getAll({}, next)
    return res.status(200).json({
      status: 200,
      data: accounts,
      message: 'Succesfully Users Retrieved'
    })
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message })
  }
}
exports.postAccount = async function(req, res, next) {
  try {
    const account = await Service.postAccount(req.body, next)
    return res.status(200).json({
      status: 200,
      data: account,
      message: 'Succesfully Users Retrieved'
    })
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message })
  }
}
exports.getAccount = async function(req, res, next) {
  try {
    const account = await Service.getAccount(req.params.id, next)
    return res.status(200).json({
      status: 200,
      data: account,
      message: 'Succesfully Users Retrieved'
    })
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message })
  }
}
exports.updateAccount = async function(req, res, next) {
  try {
    const account = await Service.updatedAccount(req.body, next)
    return res.status(200).json({
      status: 200,
      data: account,
      message: 'Succesfully Users Retrieved'
    })
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message })
  }
}
