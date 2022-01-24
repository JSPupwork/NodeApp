const { version } = require('../../package')

const config = {
  routePrefix: '/',
  openapi: {
    info: {
      title: 'Training Center API',
      description: 'API doc for Training Center Project',
      version
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  exposeRoute: true
}

module.exports = config
