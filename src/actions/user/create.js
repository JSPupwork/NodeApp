const argon2 = require('argon2')
const parsePhoneNumber = require('libphonenumber-js')
const { nanoid } = require('nanoid/async')

const { User } = require('../../db/models')
const { storeFiles, deleteFiles, setupFullUrls } = require('../../storage')
const { USER_ROLES } = require('../../enums')

const hashPassword = password => {
  return argon2.hash(password)
}

const createPermissions = {
  // req.body.role    // req.role
  [USER_ROLES.STUDENT]: [USER_ROLES.MANAGER, USER_ROLES.ADMIN],
  [USER_ROLES.MANAGER]: [USER_ROLES.ADMIN],
  [USER_ROLES.ADMIN]: []
}
const hasCreatePermission = (creatingRole, currentRole) => {
  return currentRole && createPermissions[creatingRole].includes(currentRole)
}

const action = async (req, res) => {
  const newUser = req.body

  const createNewCandidate = !(newUser.role && newUser.role !== USER_ROLES.CANDIDATE)
  if (!createNewCandidate && !hasCreatePermission(newUser.role, req.role))
    return res.code(403).send({ error: 'Not Authorized for action' })

  let isUserExist = {}
  try {
    isUserExist = await User.findOne({ where: { email: newUser.email } })
  } catch (e) {
    return res.code(500)
  }

  if (isUserExist) {
    return res.status(400).send({ error: 'User is already exists' })
  }

  if (createNewCandidate) {
    const phoneNumber = parsePhoneNumber(newUser.phoneNumber, 'UA')
    if (!phoneNumber || !phoneNumber.isValid()) {
      return res.status(400).send({ error: 'Phone number is invalid' })
    }
    newUser.phoneNumber = phoneNumber.number
  }

  let password = ''
  if (!createNewCandidate) {
    password = await nanoid(15)
    newUser.password = password
  }
  newUser.password = await hashPassword(newUser.password)

  if (createNewCandidate) {
    try {
      await storeFiles(newUser)
    } catch (e) {
      return res.status(e.code || 500).send({ error: e.res || 'Internal Server Error' })
    }
  }

  let createdUser = {}
  try {
    createdUser = await User.create(newUser)
  } catch (e) {
    if (createNewCandidate) await deleteFiles(newUser)
    return res.code(500).send()
  }

  if (!createNewCandidate) {
    // sendMailToNewUser(newUser.email, password)
  }

  const userRes = createdUser.dataValues
  delete userRes.password

  setupFullUrls(userRes)

  res.status(201).send(userRes)
}

module.exports = action
