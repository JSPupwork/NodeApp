require('dotenv').config()

const development = {
  username: process.env.MYSQL_USER || 'dbuser',
  password: process.env.MYSQL_PASSWORD || 'dbpassword',
  database: process.env.MYSQL_DATABASE || 'tc-db',
  host: process.env.MYSQL_HOST || '127.0.0.1',
  dialect: 'mysql',
  logging: true
}

const testing = {
  ...development,
  logging: false
}

const production = {
  ...testing
}

module.exports = {
  development,
  testing,
  production
}
