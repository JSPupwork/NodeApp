const fs = require('fs')
const Sequelize = require('sequelize')

const config = require(__dirname + '/../config')[process.env.NODE_ENV || 'development']

const sequelize = new Sequelize(config.database, config.username, config.password, config)

const db = {}

fs.readdirSync(__dirname).forEach(file => {
  if (file === 'index.js') return
  const model = require(__dirname + '/' + file)(sequelize, Sequelize.DataTypes)
  db[model.name] = model
})

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) db[modelName].associate(db)
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
