'use strict'

const { COURSES, ENGLISH_LEVEL, REFERRAL, USER_ROLES } = require('../../enums')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true
      },
      role: {
        type: Sequelize.ENUM,
        values: Object.values(USER_ROLES),
        allowNull: false
      },
      firstName: {
        // will it be split?
        type: Sequelize.STRING,
        required: true
      },
      lastName: {
        // will it be split?
        type: Sequelize.STRING,
        required: true
      },
      email: {
        type: Sequelize.STRING,
        required: true
      },
      course: {
        type: Sequelize.ENUM,
        values: Object.values(COURSES),
        required: true
      },
      englishLevel: {
        type: Sequelize.ENUM,
        values: Object.values(ENGLISH_LEVEL),
        required: true
      },
      linkedInUrl: {
        type: Sequelize.STRING
      },
      skype: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING,
        required: true
      },
      cvUrl: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING,
        required: true
      },
      location: {
        type: Sequelize.STRING,
        required: true
        //database of cities
      },
      referral: {
        type: Sequelize.ENUM,
        values: Object.values(REFERRAL)
      },
      experience: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: { type: Sequelize.DATE }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users')
  }
}
