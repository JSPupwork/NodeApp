const { defaultErrors } = require('../responses')
const properties = require('./properties')

const schema = {
  description: 'Get a specific course or all of them',
  tags: ['Course'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', minLength: 1 }
    },
    required: ['id']
  },
  response: {
    ...defaultErrors,
    200: {
      type: 'object',
      properties,
      required: Object.keys(properties)
    }
  }
}

module.exports = schema
