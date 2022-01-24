const { S3Client } = require('@aws-sdk/client-s3')
const { isProd } = require('../config')

const REGION = process.env.S3_REGION || 'eu-north-1'
const ACCESS_KEY = process.env.S3_ACCESS_KEY || 'minioadmin'
const SECRET_KEY = process.env.S3_SECRET_KEY || 'minioadmin'
const BUCKET_NAME = process.env.S3_BUCKET || 'test'

const credentials = {
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY
}

const config = isProd
  ? { credentials }
  : {
      credentials,
      region: REGION,
      endpoint: 'http://127.0.0.1:' + (process.env.S3_PORT || 9000),
      forcePathStyle: true,
      tls: false
    }

const s3Client = new S3Client(config)

module.exports = { s3Client, BUCKET_NAME, REGION }
