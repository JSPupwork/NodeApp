'use strict'

const tap = require('tap')

const methods = require('../../src/router/methods')
const urls = require('../..//src/router/routes')

const build = require('../../src/app')

tap.beforeEach(t => (t.context.app = build))

tap.test('/courses route tests:', t => {
  t.test('GET /courses valid req =>', async t => {
    const res = await t.context.app.inject({
      method: methods.GET,
      url: urls.COURSES
    })

    t.equal(res.statusCode, 200, 'status code should be 200')
    t.equal(Array.isArray(JSON.parse(res.body)), true, 'response should be an array')
    t.end()
  })

  t.end()
})
