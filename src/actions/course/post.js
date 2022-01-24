const { Course } = require('../../db/models')
const { isValidStartDate, handleError } = require('./helpers')

const action = async (req, res) => {
  const course = req.body

  if (course?.startDate && course?.endDate && !isValidStartDate(course)) {
    return res.code(400).send({ error: 'Invalid course dates!' })
  }

  try {
    await Course.create(course, { fields: Object.keys(course) })
    res.code(201).send()
  } catch (err) {
    res.log.error(err)
    const { code, message } = handleError(err)
    res.code(code).send({ error: message })
  }
}

module.exports = action
