'use strict'

const tap = require('tap')

const methods = require('../../src/router/methods')
const urls = require('../../src/router/routes')

const build = require('../../src/app')

tap.beforeEach(t => (t.context.app = build))

tap.test('/course/:id route tests:', t => {
  t.test('GET /course req without param and /', async t => {
    const res = await t.context.app.inject({
      method: methods.GET,
      url: '/course'
    })

    t.equal(res.statusCode, 404, 'status code should be 404')
    t.end()
  })
  t.test('GET /course/ req without param =>', async t => {
    const res = await t.context.app.inject({
      method: methods.GET,
      url: '/course/'
    })

    t.equal(res.statusCode, 400, 'status code should be 400')
    t.end()
  })
  t.test('GET /course/asdaasdasd req with non existing id =>', async t => {
    const res = await t.context.app.inject({
      method: methods.GET,
      url: '/course/asdaasdasd'
    })

    t.equal(res.statusCode, 404, 'status code should be 404')
    t.end()
  })
  t.test('GET /course/test-uuid req with existing id =>', async t => {
    const res = await t.context.app.inject({
      method: methods.GET,
      url: '/course/test-uuid'
    })

    const body = JSON.parse(res.body)
    t.equal(res.statusCode, 200, 'status code should be 200')
    t.equal(body.name, 'test name', 'course name should be *test name*')
    t.end()
  })
  t.end()
})
