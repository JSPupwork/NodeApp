const schema = {
  description: 'Log in user and give authorization token (or not)',
  tags: ['Authorization'],
  body: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      password: { type: 'string' }
    },
    required: ['email', 'password']
  },
  response: {
    401: {
      type: 'object',
      properties: {
        error: { type: 'string' }
      }
    },
    500: { type: 'string' },
    201: { type: 'string' }
  }
}

module.exports = schema
