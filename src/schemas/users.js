const { USER_ROLES, COURSES, ENGLISH_LEVEL, REFERRAL } = require('../enums')

const user = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string' },
    role: { type: 'string' },
    course: { type: 'string' },
    password: { type: 'string' },
    phoneNumber: { type: 'string' },
    englishLevel: { type: 'string' },
    linkedInUrl: { type: 'string' },
    skype: { type: 'string' },
    location: { type: 'string' },
    referral: { type: 'string' },
    cvUrl: { type: 'string' }
  }
}

const list = {
  description: 'Get all users',
  tags: ['User'],
  query: {
    type: 'object',
    properties: {
      role: { type: 'string' }
    },
    additionalProperties: false
  },
  response: {
    400: { type: 'string' },
    401: { type: 'string' },
    403: { type: 'string' },
    500: { type: 'string' },
    200: {
      type: 'array',
      items: user
    }
  }
}

const baseUserProps = {
  firstName: { type: 'string' },
  lastName: { type: 'string' },
  email: { type: 'string' },
  role: {
    type: 'string',
    enum: Object.values(USER_ROLES),
    default: USER_ROLES.CANDIDATE
  },
  course: {
    type: 'string',
    enum: Object.values(COURSES)
  }
}
const requiredForCandidate = {
  password: { type: 'string' },
  phoneNumber: { type: 'string' },
  englishLevel: {
    type: 'string',
    enum: Object.values(ENGLISH_LEVEL)
  },
  linkedInUrl: { type: 'string' },
  skype: { type: 'string' },
  location: { type: 'string' },
  referral: {
    type: 'string',
    enum: Object.values(REFERRAL)
  },
  cv: { type: 'string' }
}

const create = {
  description: 'Create new user',
  tags: ['User'],
  body: {
    type: 'object',
    if: {
      properties: {
        role: { const: USER_ROLES.CANDIDATE }
      }
    },
    then: {
      type: 'object',
      properties: {
        ...baseUserProps,
        ...requiredForCandidate
      },
      required: [
        'firstName',
        'lastName',
        'email',
        'course',
        'password',
        'phoneNumber',
        'englishLevel',
        'skype',
        'location',
        'referral',
        'cv'
      ]
    },
    else: {
      type: 'object',
      required: ['firstName', 'lastName', 'email', 'course', 'role'],
      properties: {
        ...baseUserProps
      },
      additionalProperties: false
    }
  },
  response: {
    400: {
      type: 'object',
      properties: {
        error: { type: 'string' }
      }
    },
    401: { type: 'string' },
    500: { type: 'string' },
    201: user
  }
}

const get = {
  description: 'Get one user',
  tags: ['User'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    },
    required: ['id']
  },
  response: {
    400: { type: 'string' },
    401: { type: 'string' },
    403: { type: 'string' },
    500: { type: 'string' },
    200: user
  }
}

const getMe = {
  description: 'Get my profile',
  tags: ['User'],
  response: {
    400: { type: 'string' },
    401: { type: 'string' },
    403: { type: 'string' },
    500: { type: 'string' },
    200: user
  }
}

const getUserOnRole = {
  description: 'Get user on role',
  tags: ['User'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      role: { type: 'string' }
    },
    required: ['id', 'role']
  },
  response: {
    400: { type: 'string' },
    401: { type: 'string' },
    403: { type: 'string' },
    500: { type: 'string' },
    200: user
  }
}

const getUsersOnRole = {
  description: 'Get all users',
  tags: ['Users'],
  params: {
    type: 'object',
    properties: {
      role: { type: 'string' }
    },
    required: ['role']
  },
  response: {
    400: { type: 'string' },
    401: { type: 'string' },
    403: { type: 'string' },
    500: { type: 'string' },
    200: {
      type: 'array',
      items: user
    }
  }
}

const update = {
  description: 'Update user',
  tags: ['User'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    },
    required: ['id']
  },
  body: {
    type: 'object',
    properties: {
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      email: { type: 'string' },
      role: { type: 'string' },
      course: { type: 'string' },
      password: { type: 'string' },
      phoneNumber: { type: 'string' },
      englishLevel: { type: 'string' },
      linkedInUrl: { type: 'string' },
      skype: { type: 'string' },
      location: { type: 'string' },
      referral: { type: 'string' },
      experience: { type: 'string' },
      cv: { type: 'string' }
    },
    additionalProperties: false
  },
  response: {
    400: { type: 'string' },
    401: { type: 'string' },
    403: { type: 'string' },
    500: { type: 'string' },
    200: user
  }
}

const deleteUser = {
  description: 'Delete user',
  tags: ['User'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    },
    required: ['id']
  },
  response: {
    400: { type: 'string' },
    401: { type: 'string' },
    403: { type: 'string' },
    500: { type: 'string' }
  }
}

module.exports = {
  list,
  get,
  getUsersOnRole,
  getUserOnRole,
  update,
  deleteUser,
  create,
  getMe
}
