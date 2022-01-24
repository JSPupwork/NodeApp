const { User } = require('../../db/models')

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.destroy({
      where: {
        id: req.params.id
      }
    })

    res.code(204).send()
  } catch (err) {
    res.send(err)
  }
}

module.exports = deleteUser
