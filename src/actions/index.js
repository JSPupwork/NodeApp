const healthCheck = require('./healthCheck')
const user = require('./user')
const authorize = require('./authorize')
const tests = require('./tests')
const interviews = require('./interviews')
const course = require('./course')

module.exports = {
  healthCheck,
  authorize,
  user,
  tests,
  interviews,
  course
}
