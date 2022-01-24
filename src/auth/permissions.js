const roles = require('./roles')
const methods = require('../router/methods')
const urls = require('../router/routes')

const permissions = {
  [urls.COURSE]: {
    [methods.PATCH]: [roles.MANAGER, roles.ADMIN],
    [methods.DELETE]: [roles.MANAGER, roles.ADMIN]
  },
  [urls.COURSES]: {
    [methods.POST]: [roles.MANAGER, roles.ADMIN]
  }
}

module.exports = permissions
