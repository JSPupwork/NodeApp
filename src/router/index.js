const methods = require('./methods')
const urls = require('./routes')
const schemas = require('../schemas')
const actions = require('../actions')

const routes = [
  // health check
  {
    method: methods.GET,
    url: urls.HEALTH_CHECK,
    schema: schemas.healthCheck,
    handler: actions.healthCheck
  },
  // user
  {
    method: methods.GET,
    url: urls.ME,
    schema: schemas.user.getMe,
    handler: actions.user.me
  },
  {
    method: methods.GET,
    url: urls.USER,
    schema: schemas.user.get,
    handler: actions.user.get
  },
  {
    method: methods.GET,
    url: urls.USERS,
    schema: schemas.user.list,
    handler: actions.user.getAll
  },
  {
    method: methods.POST,
    url: urls.USERS,
    schema: schemas.user.create,
    handler: actions.user.create
  },
  {
    method: methods.PUT,
    url: urls.USER,
    schema: schemas.user.update,
    handler: actions.user.update
  },
  {
    method: methods.DELETE,
    url: urls.USER,
    schema: schemas.user.deleteUser,
    handler: actions.user.del
  },
  // auth
  {
    method: methods.POST,
    url: urls.AUTHORIZE,
    schema: schemas.authorize,
    handler: actions.authorize
  },
  // test
  {
    method: methods.GET,
    url: urls.TESTS,
    schema: schemas.tests.getAll,
    handler: actions.tests.getAll
  },
  {
    method: methods.GET,
    url: urls.TEST,
    schema: schemas.tests.getOne,
    handler: actions.tests.getOne
  },
  {
    method: methods.POST,
    url: urls.TESTS,
    schema: schemas.tests.addOne,
    handler: actions.tests.addOne
  },
  {
    method: methods.PATCH,
    url: urls.TEST,
    schema: schemas.tests.updateOne,
    handler: actions.tests.updateOne
  },
  {
    method: methods.DELETE,
    url: urls.TEST,
    schema: schemas.tests.deleteOne,
    handler: actions.tests.deleteOne
  },
  // interview
  {
    method: methods.GET,
    url: urls.INTERVIEWS,
    schema: schemas.interviews.getAll,
    handler: actions.interviews.getAll
  },
  {
    method: methods.GET,
    url: urls.INTERVIEW,
    schema: schemas.interviews.getOne,
    handler: actions.interviews.getOne
  },
  {
    method: methods.POST,
    url: urls.INTERVIEWS,
    schema: schemas.interviews.addOne,
    handler: actions.interviews.addOne
  },
  {
    method: methods.PATCH,
    url: urls.INTERVIEW,
    schema: schemas.interviews.updateOne,
    handler: actions.interviews.updateOne
  },
  {
    method: methods.DELETE,
    url: urls.INTERVIEW,
    schema: schemas.interviews.deleteOne,
    handler: actions.interviews.deleteOne
  },
  // course
  {
    method: methods.GET,
    url: urls.COURSES,
    schema: schemas.course.getAll,
    handler: actions.course.get
  },
  {
    method: methods.GET,
    url: urls.COURSE,
    schema: schemas.course.get,
    handler: actions.course.get
  },
  {
    method: methods.POST,
    url: urls.COURSES,
    schema: schemas.course.post,
    handler: actions.course.post
  },
  {
    method: methods.PATCH,
    url: urls.COURSE,
    schema: schemas.course.patch,
    handler: actions.course.patch
  },
  {
    method: methods.DELETE,
    url: urls.COURSE,
    schema: schemas.course.del,
    handler: actions.course.del
  }
]

const init = async app => routes.map(r => app.route(r))

module.exports = init
