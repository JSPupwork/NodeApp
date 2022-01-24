const { Course } = require('../../db/models')
const { isValidStartDate, handleError } = require('./helpers')

const action = async (req, res) => {
  if (!Object.keys(req.body).length) {
    return res.code(400).send({ error: 'Empty body' })
  }

  const where = {
    id: req.params.id
  }

  try {
    const course = await Course.findOne({ where })
    if (!course) {
      return res.code(404).send()
    }

    const newCourse = { ...course.dataValues, ...req.body }
    if (!isValidStartDate(newCourse)) {
      return res.code(400).send({ error: 'Invalid course dates!' })
    }

    const result = await course.update(req.body)

    res.send(course)
  } catch (err) {
    const { code, message } = handleError(err)
    res.code(code).send({ error: message })
  }
}

module.exports = action
