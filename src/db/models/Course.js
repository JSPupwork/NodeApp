const { DataTypes } = require('sequelize')

module.exports = client => {
  const Course = client.define(
    'Course',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      requirements: {
        type: DataTypes.STRING,
        allowNull: true
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true
        }
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true
        }
      }
    },
    {
      tableName: 'courses'
    }
  )

  return Course
}
