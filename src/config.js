const isProd = process.env.NODE_ENV === 'production'
const isTest = process.env.NODE_ENV === 'testing'

const loggerLevel = () => {
  if (!isTest) {
    return isProd ? { level: 'warn' } : { level: 'info', prettyPrint: true }
  }
  return false
}

const MAX_BODY_SIZE = 1024 * 1024 * 4

const appConfig = {
  logger: loggerLevel(),
  bodyLimit: MAX_BODY_SIZE,
  ajv: {
    customOptions: {
      coerceTypes: 'array'
    }
  }
}

const domain = process.env.DOMAIN || 'localhost'

module.exports = {
  isProd,
  isTest,
  appConfig,
  domain
}
