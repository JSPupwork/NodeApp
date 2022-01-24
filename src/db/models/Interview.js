const { DataTypes } = require('sequelize')

module.exports = client => {
  const Interview = client.define(
    'Interview',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
      },
      title: {
        type: DataTypes.STRING,
        required: true
      },
      duration: {
        type: DataTypes.INTEGER,
        required: true
      },
      date: {
        type: DataTypes.DATE,
        required: true
      },
      description: {
        type: DataTypes.TEXT
      }
    },
    {
      tableName: 'interviews'
    }
  )

  return Interview
}
