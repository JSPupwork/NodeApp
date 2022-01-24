const typeNumber = { type: 'number' }
const typeString = { type: 'string' }

const errs = {
  400: typeString,
  401: typeString,
  403: typeString,
  404: typeString,
  500: typeString
}

const test = {
  type: 'object',
  properties: {
    id: typeNumber,
    title: typeString,
    deadlineAt: typeString,
    link: typeString,
    description: typeString
  }
}

const getAll = {
  description: 'Get all tests',
  tags: ['Test'],
  response: {
    ...errs,
    200: {
      type: 'array',
      items: test
    }
  }
}

const getOne = {
  description: 'Get a specific test',
  tags: ['Test'],
  params: {
    type: 'object',
    properties: {
      id: typeString
    },
    required: ['id']
  },
  response: {
    ...errs,
    200: test
  }
}

const addOne = {
  description: 'Add new test',
  tags: ['Test'],
  body: {
    type: 'object',
    required: ['title', 'deadlineAt', 'link', 'description'],
    properties: {
      title: typeString,
      deadlineAt: typeString,
      link: typeString,
      description: typeString
    }
  },
  response: {
    ...errs,
    201: test
  }
}

const updateOne = {
  description: 'Update test',
  tags: ['Test'],
  params: {
    type: 'object',
    properties: {
      id: typeString
    },
    required: ['id']
  },
  body: {
    type: 'object',
    required: ['title', 'deadlineAt', 'link', 'description'],
    properties: {
      title: typeString,
      deadlineAt: typeString,
      link: typeString,
      description: typeString
    }
  },
  response: {
    ...errs,
    200: test
  }
}

const deleteOne = {
  description: 'Delete a specific test',
  tags: ['Test'],
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
