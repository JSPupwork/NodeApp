const { DataTypes } = require('sequelize')

const { COURSES, ENGLISH_LEVEL, REFERRAL, USER_ROLES } = require('../../enums')

module.exports = client => {
  const User = client.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true
      },
      role: {
        type: DataTypes.ENUM,
        values: Object.values(USER_ROLES),
        allowNull: false,
        defaultValue: USER_ROLES.CANDIDATE
      },
      firstName: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      course: {
        type: DataTypes.ENUM,
        values: Object.values(COURSES),
        allowNull: false
      },
      englishLevel: {
        type: DataTypes.ENUM,
        values: Object.values(ENGLISH_LEVEL)
      },
      linkedInUrl: {
        type: DataTypes.STRING
      },
      skype: {
        type: DataTypes.STRING
      },
      phoneNumber: {
        type: DataTypes.STRING
      },
      cvUrl: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      location: {
        type: DataTypes.STRING
        //database of cities
      },
      referral: {
        type: DataTypes.ENUM,
        values: Object.values(REFERRAL)
      },
      experience: {
        type: DataTypes.TEXT
      },
      deletedAt: { type: DataTypes.DATE }
    },
    {
      tableName: 'users'
    }
  )

  return User
}
