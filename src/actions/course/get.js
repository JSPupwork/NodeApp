const { Course } = require('../../db/models')
const { handleError } = require('./helpers')

const action = async (req, res) => {
  let findCondition = {}
  if (req.params.id) {
    findCondition = {
      where: {
        id: req.params.id
      }
    }
  }

  try {
    const courses = await Course.findAll(findCondition)
    if (!courses) return res.code(404).send()

    res.send(courses)
  } catch (err) {
    const { code, status } = handleError(err)
    res.code(code).send(status)
  }
}

module.exports = action
