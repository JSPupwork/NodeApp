const { defaultErrors } = require('../responses')
const properties = require('./properties')

const schema = {
  description: 'Change course',
  tags: ['Course'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', minLength: 1 }
    },
    required: ['id']
  },
  body: {
    type: 'object',
    properties
  },
  response: {
    ...defaultErrors,
    200: {
      type: 'object',
      properties: {
        updatedRows: { type: 'number' }
      },
      required: ['updatedRows']
    }
  }
}

module.exports = schema
