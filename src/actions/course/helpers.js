const Dayjs = require('dayjs')
const sequelize = require('sequelize')

const spreadIdsForOrOperator = arr => arr.map(id => ({ id }))

const isValidStartDate = obj => {
  return Dayjs(obj.endDate).diff(obj.startDate, 'ms') > 0
}

const handleError = err => {
  let res = { code: 500, message: 'Internal server error' }
  if (err instanceof sequelize.ValidationError) {
    res = { code: 400, message: err.message }
  }
  return res
}

module.exports = {
  spreadIdsForOrOperator,
  isValidStartDate,
  handleError
}
