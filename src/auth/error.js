const authErrors = {
  badRequestErrorMessage: 'Format is Authorization: Bearer [token]',
  noAuthorizationInHeaderMessage: 'Authorization header is missing!',
  unAuthorized: 'Unauthorized!',
  accessDenied: 'Access is denied',
  authorizationTokenExpiredMessage: 'Authorization token expired',
  authorizationTokenInvalid: 'Authorization token is invalid!'
}

module.exports = {
  authErrors
}
