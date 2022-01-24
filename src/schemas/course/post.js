const { defaultErrors } = require('../responses')
const properties = require('./properties')

const schema = {
  description: 'Add new courses',
  tags: ['Course'],
  body: {
    type: 'object',
    properties,
    required: Object.keys(properties)
  },
  response: {
    ...defaultErrors,
    201: { type: 'string' }
  }
}

module.exports = schema
