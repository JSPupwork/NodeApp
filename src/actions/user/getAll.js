const { User } = require('../../db/models')
const { setupFullUrls } = require('../../storage')

const action = async (req, res) => {
  const where = {}
  if (req.query.role) where.role = req.query.role

  try {
    const users = await User.findAll({ where })

    const usersRes = users.map(u => {
      const user = u.dataValues
      delete user.password

      return user
    })

    setupFullUrls(usersRes)

    res.send(usersRes)
  } catch (err) {
    res.status(500).send({ error: err })
  }
}

module.exports = action
