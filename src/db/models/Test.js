const { DataTypes } = require('sequelize')

module.exports = client => {
  const Test = client.define(
    'Test',
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
      deadlineAt: {
        type: DataTypes.DATE,
        required: true
      },
      link: {
        type: DataTypes.STRING,
        required: true
      },
      description: {
        type: DataTypes.TEXT
      }
    },
    {
      tableName: 'tests'
    }
  )

  return Test
}
