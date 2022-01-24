const { User } = require('../../db/models')

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.update(req.body, {
      where: {
        id: req.params.id
      }
    })

    res.send()
  } catch (err) {
    res.send(err)
  }
}

module.exports = updateUser
