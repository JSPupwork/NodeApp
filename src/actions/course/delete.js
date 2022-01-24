const { Course } = require('../../db/models')
const { handleError } = require('./helpers')

const action = async (req, res) => {
  try {
    const deletedRows = await Course.destroy({
      where: {
        id: req.params.id
      }
    })

    if (!deletedRows) return res.code(404).send()

    res.code(204).send()
  } catch (err) {
    const { code, status } = handleError(err)
    res.code(code).send(status)
  }
}

module.exports = action
