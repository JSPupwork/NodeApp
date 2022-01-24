const { PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const { nanoid } = require('nanoid/async')

const { BUCKET_NAME, s3Client, REGION } = require('./client')
const checkOrCreateBucket = require('./checkOrCreateBucket')
const { isProd } = require('../config')

const FILE_PROPS = {
  cv: 'cvUrl',
  lesson: 'lessonUrl',
  homework: 'hwUrl'
}

const PREFIX_MAP = {
  cv: 'cvs',
  lesson: 'lessons',
  homework: 'homeworks'
}

class StorageError extends Error {
  constructor(message, status, cause) {
    super(message)
    this.status = status
    this.res = status === 500 ? 'Internal Server Error' : message
    this.cause = cause || message

    Error.captureStackTrace(this, this.constructor)
  }
}

isProd || checkOrCreateBucket(s3Client, BUCKET_NAME) // Check if the Bucket exists

// 'data:image/png;base64, ....'
const uploadFile = async (payload, target) => {
  if (!PREFIX_MAP[target])
    throw new StorageError('Internal Server Error', 500, 'Folder does`t exist for provided file!')

  const startPos = payload[target].indexOf(':') + 1
  const endPos = payload[target].indexOf(';')

  const mimetype = payload[target].substring(startPos, endPos)
  const base64 = payload[target].replace(/^data:\w+\/\w+;base64,/, '')

  if (startPos < 0 || endPos < 0 || !mimetype || mimetype.split('/').length !== 2)
    throw new StorageError('Invalid or unsupported file`s format', 400, 'Invalid base64 format!')

  const urlId = await nanoid(30)

  const key = PREFIX_MAP[target] + '/' + urlId + '.' + mimetype.split('/')[1]

  const putConfig = {
    Bucket: BUCKET_NAME,
    Key: key,
    Body: Buffer.from(base64, 'base64'),
    ContentType: mimetype,
    ACL: 'public-read'
  }

  await s3Client.send(new PutObjectCommand(putConfig))

  return key
}

const storeFiles = async payload => {
  if (typeof payload !== 'object')
    throw new StorageError('Internal Server Error', 500, 'Failed to store files. Provided type is not object')

  for (const [target, replace] of Object.entries(FILE_PROPS)) {
    if (target in payload) {
      const fileUrl = await uploadFile(payload, target)

      delete payload[target]
      payload[replace] = fileUrl
    }
  }

  return payload
}

const setupFullUrl = payload => {
  if (!payload) throw new StorageError('Internal Server Error', 500, 'Failed setup full url. Empty value passed')
  for (const [_, field] of Object.entries(FILE_PROPS)) {
    if (payload[field])
      payload[field] = isProd
        ? `https://s3.${REGION}.amazonaws.com/${BUCKET_NAME}/${payload[field]}`
        : 'http://localhost:' + (process.env.S3_PORT || 9000) + '/' + BUCKET_NAME + '/' + payload[field]
  }
  return payload
}

const setupFullUrls = payload => {
  let payloadWithUrls

  if (Array.isArray(payload)) {
    payloadWithUrls = payload.map(pl => setupFullUrl(pl))
  } else if (typeof payload === 'object') {
    payloadWithUrls = setupFullUrl(payload)
  }

  return payloadWithUrls || payload
}

const deleteFiles = async payload => {
  if (!payload) throw new StorageError('Internal Server Error', 500, 'Failed to delete files. Empty value passed')
  for (const urlKey of Object.values(FILE_PROPS)) {
    if (payload[urlKey]) {
      const deleteConfig = {
        Bucket: BUCKET_NAME,
        Key: payload[urlKey],
        VersionId: 'null'
      }

      await s3Client.send(new DeleteObjectCommand(deleteConfig))
    }
  }
  return payload
}

module.exports = {
  uploadFile,
  setupFullUrls,
  storeFiles,
  deleteFiles,
  StorageError,
  FILE_PROPS
}
