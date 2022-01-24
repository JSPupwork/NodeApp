const { defaultErrors } = require('../responses')

const schema = {
  description: 'Delete a specific course',
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
      properties: {
        deletedRows: { type: 'number' }
      },
      required: ['deletedRows']
    }
  }
}

module.exports = schema
