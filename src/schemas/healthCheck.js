const schema = {
  description: 'Check if system works',
  tags: ['Health Check'],
  response: {
    200: {
      type: 'object',
      properties: {
        status: { type: 'string' }
      },
      required: ['status']
    },
    401: { type: 'string' },
    403: { type: 'string' },
    500: { type: 'string' }
  }
}

module.exports = schema
