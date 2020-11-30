import { User } from './user.model'

export const oneUserByEmail = async (req, res) => {
  try {
    const { email } = req.query
    const user = await User.find({ email }).exec()
    res.status(200).json({ data: user })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}
export const allUser = async (req, res) => {
  try {
    const user = await User.find({}).exec()
    res.status(200).json({ data: user })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const updateOneUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true
    })
      .lean()
      .exec()
    res.status(200).json({ data: user })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}
