const fp = require('fastify-plugin')
const fJWT = require('fastify-jwt')
const fCookie = require('fastify-cookie')

const { validateToken, AUTH_COOKIE_NAME } = require('./jwt.js')
const { hasPermission, isPublicRequest } = require('./auth.js')
const { authErrors } = require('./error.js')
const { User } = require('../db/models')

const init = fp(async (fastify, opts) => {
  fastify.register(fJWT, {
    secret: process.env.JWT_SIGN_SECRET || 'jwt secret',
    cookie: {
      cookieName: AUTH_COOKIE_NAME,
      sign: true
    }
  })

  fastify.register(fCookie, {
    secret: process.env.JWT_SIGN_SECRET || 'jwt secret'
  })

  fastify.decorateRequest('uId', '')
  fastify.decorateRequest('role', '')

  fastify.addHook('onRequest', async (req, res) => {
    const publicRequest = isPublicRequest(req)

    const cookie = req.cookies[AUTH_COOKIE_NAME]

    if (!cookie) {
      if (publicRequest) return
      return res.code(401).send(authErrors.unAuthorized)
    }

    const token = req.unsignCookie(cookie).value
    const { ok, code } = await validateToken(token, fastify)

    if (!ok) {
      if (publicRequest) return
      return res.code(code).send(authErrors.unAuthorized)
    }

    const payload = fastify.jwt.decode(token)

    const owner = await User.findByPk(payload.uId, { attributes: ['role'] })

    if (!hasPermission({ role: owner.role }, req)) {
      return res.code(403).send(authErrors.accessDenied)
    }

    req.uId = payload.uId
    req.role = owner.role || 'unknown'
  })
})

module.exports = init
