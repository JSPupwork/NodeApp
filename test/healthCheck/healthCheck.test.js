const { test } = require('tap')

const app = require('../../src/app')
const { HEALTH_CHECK } = require('../../src/router/routes')
const { GET } = require('../../src/router/methods')

test('requests the health check route', async t => {
  t.teardown(() => app.close())

  const response = await app.inject({
    method: GET,
    url: HEALTH_CHECK
  })
  t.equal(response.statusCode, 200, 'returns a status code of 200')
})
