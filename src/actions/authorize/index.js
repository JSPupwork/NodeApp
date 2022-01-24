const argon2 = require('argon2')
const { setAuthCookie, signToken } = require('../../auth/jwt.js')
const { User } = require('../../db/models')

const action = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } })

  const isVerified = await argon2.verify(user.password, req.body.password)

  if (!user || !isVerified) {
    return res.code(401).send({ error: 'Wrong email or password!' })
  }

  const payload = {
    uId: user.id
  }
  await setAuthCookie(res, await signToken(res, payload))

  res.code(201).send()
}

module.exports = action
