const permissions = require('./permissions')

const isPublicRequest = req => !permissions[req.routerPath]?.[req.method]

const hasPermission = (payload, req) => {
  if (isPublicRequest(req)) return true

  const validRoles = permissions[req.routerPath][req.method]
  if (validRoles && !validRoles.includes(payload.role)) return false
  return true
}

module.exports = {
  hasPermission,
  isPublicRequest
}
