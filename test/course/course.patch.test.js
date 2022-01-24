'use strict'

const tap = require('tap')

const methods = require('../../src/router/methods')
const urls = require('../../src/router/routes')

const build = require('../../src/app')

tap.beforeEach(t => (t.context.app = build))

tap.test('/course/:id route tests:', t => {
  t.test('PATCH /course req without param and / =>', async t => {
    const res = await t.context.app.inject({
      method: methods.PATCH,
      url: '/course'
    })

    t.equal(res.statusCode, 404, 'status code should be 404')
    t.end()
  })
  t.test('PATCH /course/:id req with existing param and valid body =>', async t => {
    const res = await t.context.app.inject({
      method: methods.PATCH,
      url: '/course/test-uuid-3',
      body: {
        name: 'patched name'
      }
    })

    t.equal(res.statusCode, 200, 'status code should be 200')
    t.end()
  })
  t.test('PATCH /course/:id req with non existing param and valid body =>', async t => {
    const res = await t.context.app.inject({
      method: methods.PATCH,
      url: '/course/test-uuid-asdadsad-kkk',
      body: {
        name: 'patched name'
      }
    })

    t.equal(res.statusCode, 404, 'status code should be 404')
    t.end()
  })
  t.test('PATCH /course req without param =>', async t => {
    const res = await t.context.app.inject({
      method: methods.PATCH,
      url: '/course/',
      body: {
        name: 'patched name'
      }
    })

    t.equal(res.statusCode, 400, 'status code should be 400')
    t.end()
  })
  t.test('PATCH /course req without body and with valid param =>', async t => {
    const res = await t.context.app.inject({
      method: methods.PATCH,
      url: '/course/test-uuid-3'
    })

    t.equal(res.statusCode, 400, 'status code should be 400')
    t.end()
  })
  t.end()
})
