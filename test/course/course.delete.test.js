'use strict'

const tap = require('tap')

const methods = require('../../src/router/methods')
const urls = require('../../src/router/routes')

const build = require('../../src/app')

tap.beforeEach(t => (t.context.app = build))

tap.test('/course/:id route tests:', t => {
  t.test('DELETE /course req without param and / =>', async t => {
    const res = await t.context.app.inject({
      method: methods.DELETE,
      url: urls.COURSES
    })

    t.equal(res.statusCode, 404, 'status code should be 404')
    t.end()
  })
  t.test('DELETE /course/:id req with existing param =>', async t => {
    const res = await t.context.app.inject({
      method: methods.DELETE,
      url: '/course/test-uuid-2'
    })

    t.equal(res.statusCode, 200, 'status code should be 200')
    t.end()
  })
  t.test('DELETE /course/:id req with non existing param =>', async t => {
    const res = await t.context.app.inject({
      method: methods.DELETE,
      url: '/course/test-uuid-asdadsad-kkk'
    })

    t.equal(res.statusCode, 404, 'status code should be 404')
    t.end()
  })
  t.test('DELETE /course req without param =>', async t => {
    const res = await t.context.app.inject({
      method: methods.DELETE,
      url: '/course/'
    })

    t.equal(res.statusCode, 400, 'status code should be 400')
    t.end()
  })
  t.end()
})
