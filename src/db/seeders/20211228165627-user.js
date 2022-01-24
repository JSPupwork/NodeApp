'use strict'
const argon2 = require('argon2')

const { img1, img2 } = require('./exampleFiles')
const { uploadFile, FILE_PROPS } = require('../../storage')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hash = await argon2.hash('pass')
    const url1 = await uploadFile({ cv: img1 }, 'cv')
    const url2 = await uploadFile({ cv: img2 }, 'cv')

    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: '75442486-0878-440c-9db1-a7006c25a39f',
          firstName: 'Vasya',
          lastName: 'Pupkin',
          email: 'pupkin@gmail.com',
          course: 'react',
          englishLevel: 'A2',
          linkedInUrl: 'https://linkedin-2',
          skype: 'skype-id-2',
          phoneNumber: '+380990000007',
          cvUrl: url1,
          password: hash,
          location: 'Lviv',
          referral: 'friends',
          role: 'student',
          experience: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null
        },
        {
          id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
          firstName: 'Vitalii',
          lastName: 'Shlomenko',
          email: 'shlomenko.vt@gmail.com',
          course: 'node',
          englishLevel: 'B1',
          linkedInUrl: 'https://linkedin',
          skype: 'skype-id',
          phoneNumber: '+380996272349',
          cvUrl: url2,
          password: hash,
          location: 'Lviv',
          referral: 'facebook',
          role: 'admin',
          experience: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null
        }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {})
  }
}
