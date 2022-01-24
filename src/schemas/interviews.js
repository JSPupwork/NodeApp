const typeNumber = { type: 'number' }
const typeString = { type: 'string' }

const errs = {
  400: typeString,
  401: typeString,
  403: typeString,
  404: typeString,
  500: typeString
}

const interview = {
  type: 'object',
  properties: {
    id: typeNumber,
    title: typeString,
    duration: typeNumber,
    date: typeString,
    description: typeString
  }
}

const getAll = {
  description: 'Get all interviews',
  tags: ['Interview'],
  response: {
    ...errs,
    200: {
      type: 'array',
      items: interview
    }
  }
}

const getOne = {
  description: 'Get a specific interview',
  tags: ['Interview'],
  params: {
    type: 'object',
    properties: {
      id: typeString
    },
    required: ['id']
  },
  response: {
    ...errs,
    200: interview
  }
}

const addOne = {
  description: 'Add new interview',
  tags: ['Interview'],
  body: {
    type: 'object',
    required: ['title', 'duration', 'date', 'description'],
    properties: {
      title: typeString,
      duration: typeNumber,
      date: typeString,
      description: typeString
    }
  },
  response: {
    ...errs,
    201: interview
  }
}

const updateOne = {
  description: 'Update interview',
  tags: ['Interview'],
  params: {
    type: 'object',
    properties: {
      id: typeString
    },
    required: ['id']
  },
  body: {
    type: 'object',
    required: ['title', 'duration', 'date', 'description'],
    properties: {
      title: typeString,
      duration: typeNumber,
      date: typeString,
      description: typeString
    }
  },
  response: {
    ...errs,
    200: interview
  }
}

const deleteOne = {
  description: 'Delete a specific interview',
  tags: ['Interview'],
  params: {
    type: 'object',
    properties: {
      id: typeString
    },
    required: ['id']
  },
  response: {
    ...errs,
    204: typeString
  }
}

module.exports = {
  getAll,
  getOne,
  addOne,
  updateOne,
  deleteOne
}
