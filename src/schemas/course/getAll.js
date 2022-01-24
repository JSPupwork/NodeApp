const { defaultErrors } = require('../responses')
const courseSchema = require('./properties')

const schema = {
  description: 'Get a specific course or all of them',
  tags: ['Course'],
  response: {
    ...defaultErrors,
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: courseSchema
      },
      required: Object.keys(courseSchema)
    }
  }
}

module.exports = schema
