'use strict'

const faker = require('@faker-js/faker')

const dbDateNow = () => new Date()

const getRandomCourses = (i = 10) => {
  return new Array(i).fill().map(() => ({
    id: faker.datatype.uuid(),
    name: faker.random.word(),
    description: faker.random.words(5),
    startDate: faker.date.recent(),
    endDate: faker.date.soon(),
    createdAt: dbDateNow(),
    updatedAt: dbDateNow()
  }))
}

const courseForTesting = [
  {
    id: 'test-uuid',
    name: 'test name',
    description: 'test description',
    startDate: faker.date.recent(),
    endDate: faker.date.soon(),
    createdAt: dbDateNow(),
    updatedAt: dbDateNow()
  },
  {
    id: 'test-uuid-2',
    name: 'test name-2',
    description: 'test description',
    startDate: faker.date.recent(),
    endDate: faker.date.soon(),
    createdAt: dbDateNow(),
    updatedAt: dbDateNow()
  },
  {
    id: 'test-uuid-3',
    name: 'test name-3',
    description: 'test description',
    startDate: faker.date.recent(),
    endDate: faker.date.soon(),
    createdAt: dbDateNow(),
    updatedAt: dbDateNow()
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('courses', getRandomCourses().concat(courseForTesting), {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('courses', null, {})
  }
}
