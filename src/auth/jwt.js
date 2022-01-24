const { domain } = require('../config')
const { CANDIDATE } = require('./roles')

const TOKEN_EXPIRE_TIME = 2592000000 //ms = 30 days
const AUTH_COOKIE_OPTIONS = {
  domain,
  path: '/',
  secure: false, //FIXME: true for prod // HTTPS only
  httpOnly: true,
  sameSite: true,
  signed: true
}
const AUTH_COOKIE_NAME = 'token'

const signToken = async (res, payload = { role: CANDIDATE }, timeToExpire) => {
  timeToExpire = timeToExpire || TOKEN_EXPIRE_TIME
  return await res.jwtSign({
    expireDate: new Date().getTime() + timeToExpire,
    ...payload
  })
}

const setAuthCookie = async (res, token) => {
  res.setCookie(AUTH_COOKIE_NAME, token, AUTH_COOKIE_OPTIONS)
}

const statusBad = (code = 401) => ({ ok: false, code })

const validateToken = async (token, fastify) => {
  try {
    await fastify.jwt.verify(token)
  } catch (err) {
    return statusBad()
  }
  try {
    const payload = fastify.jwt.decode(token)
    if (payload.expireDate < new Date().getTime()) {
      return statusBad()
    }
    return { ok: true, code: 200 }
  } catch {
    return statusBad(500)
  }
}

module.exports = {
  signToken,
  setAuthCookie,
  validateToken,
  AUTH_COOKIE_NAME
}
