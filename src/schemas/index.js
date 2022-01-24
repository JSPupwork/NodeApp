const healthCheck = require('./healthCheck')
const authorize = require('./authorize')
const user = require('./users')
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
