const courseSchema = {
  id: { type: 'string' },
  name: { type: 'string' },
  description: { type: 'string' },
  requirements: { type: 'string' },
  startDate: { type: 'string' },
  endDate: { type: 'string' }
  //FIXME: constraints here!
}

module.exports = courseSchema
