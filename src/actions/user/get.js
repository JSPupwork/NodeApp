const { User } = require('../../db/models')
const { setupFullUrls } = require('../../storage')

const action = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)

    const userRes = user.dataValues
    delete userRes.password

    setupFullUrls(userRes)

    user ? res.send(userRes) : res.code(404).send()
  } catch (err) {
    res.send(err)
  }
}

module.exports = action
