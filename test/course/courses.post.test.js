'use strict'

const tap = require('tap')

const methods = require('../../src/router/methods')
const urls = require('../../src/router/routes')

const build = require('../../src/app')

tap.beforeEach(t => (t.context.app = build))

const validPostBody = {
  id: 'test-uuid-17',
  name: 'test name',
  description: 'test description',
  requirements: '',
  startDate: '2022-01-13',
  endDate: '2022-01-14'
}

const invalidPostBody = {
  id: 'test-uuid',
  name: 'test name',
  description: 'test description',
  requirements: '',
  startDate: '2022-01-14',
  endDate: '2022-01-12'
}

tap.test('/courses route tests:', t => {
  t.test('POST /courses req valid =>', async t => {
    const res = await t.context.app.inject({
      method: methods.POST,
      url: urls.COURSES,
      body: validPostBody
    })

    t.equal(res.statusCode, 201, 'status code should be 201')
    t.end()
  })
  t.test('POST /courses req with invalid dates =>', async t => {
    const res = await t.context.app.inject({
      method: methods.POST,
      url: urls.COURSES,
      body: invalidPostBody
    })

    t.equal(res.statusCode, 400, 'status code should be 400')
    t.equal(res.body, 'Invalid course dates!', 'body should contain right message')
    t.end()
  })
  t.test('POST /courses req without required field =>', async t => {
    const body = { ...invalidPostBody }
    delete body['description']

    const res = await t.context.app.inject({
      method: methods.POST,
      url: urls.COURSES,
      body
    })
    t.equal(res.statusCode, 400, 'status code should be 400')
    t.end()
  })
  t.test('POST /courses req with field that has wrong type =>', async t => {
    const body = { ...validPostBody }
    body.name = 5.5

    const res = await t.context.app.inject({
      method: methods.POST,
      url: urls.COURSES,
      body
    })

    t.equal(res.statusCode, 400, 'status code should be 400')
    t.equal(res.body, 'Validation error', 'body should contain right message')
    t.end()
  })
  t.end()
})
