const routes = {
  AUTHORIZE: '/auth/token',

  HEALTH_CHECK: '/health-check',

  USER: '/user/:id',
  USERS: '/user',
  ME: '/me',

  INTERVIEWS: '/interview',
  INTERVIEW: '/interview/:id',

  TESTS: '/test',
  TEST: '/test/:id',

  COURSE: '/course/:id',
  COURSES: '/course'
}

module.exports = routes
