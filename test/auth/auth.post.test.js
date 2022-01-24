const tap = require('tap')
const faker = require('@faker-js/faker')

const methods = require('../../src/router/methods')
const urls = require('../../src/router/routes')

const app = require('../../src/app')

const { User } = require('../../src/db/models')
const roles = require('../../src/auth/roles')

const getUser = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
  role: roles.CANDIDATE
})

tap.test('/auth/token route tests', t => {
  t.test('POST /auth/token with valid email and password', async t => {
    // create test user
    const userData = getUser()
    const user = await User.create(userData)

    const res = await app.inject({
      method: methods.POST,
      url: urls.AUTHORIZE,
      body: userData
    })

    t.equal(res.statusCode, 201, 'status code should be 201')
    t.ok(res.headers['set-cookie'], 'server should set auth cookie')

    await user.destroy()

    t.end()
  })

  t.test('POST /auth/token with invalid email and password', async t => {
    const userData = getUser()
    const user = await User.create(userData)

    const res = await app.inject({
      method: methods.POST,
      url: urls.AUTHORIZE,
      body: {
        ...userData,
        email: 'wrong@email'
      }
    })

    await user.destroy()

    t.equal(res.statusCode, 401, 'status code should be 401')
    t.end()
  })

  t.test('POST /auth/token with empty body', async t => {
    const res = await app.inject({
      method: methods.POST,
      url: urls.AUTHORIZE,
      body: {}
    })

    t.equal(res.statusCode, 400, 'status code should be 400')
    t.end()
  })

  t.test('POST /auth/token with only valid email', async t => {
    const userData = getUser()

    const res = await app.inject({
      method: methods.POST,
      url: urls.AUTHORIZE,
      body: {
        email: userData.email
      }
    })

    t.equal(res.statusCode, 400, 'status code should be 400')
    t.end()
  })

  t.test('POST /auth/token with only valid password', async t => {
    const userData = getUser()

    const res = await app.inject({
      method: methods.POST,
      url: urls.AUTHORIZE,
      body: {
        password: userData.password
      }
    })

    t.equal(res.statusCode, 400, 'status code should be 400')
    t.end()
  })
  t.end()
})
