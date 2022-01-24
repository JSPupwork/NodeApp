const { ListBucketsCommand, CreateBucketCommand, PutBucketPolicyCommand } = require('@aws-sdk/client-s3')

const checkOrCreateBucket = async (client, bucket_name) => {
  try {
    const data = await client.send(new ListBucketsCommand({}))

    const buckets = data?.Buckets

    const isBucketExists = buckets.some(bucket => bucket.Name === bucket_name)
    if (!isBucketExists) {
      // Set the bucket parameters
      const bucketParams = { Bucket: bucket_name }

      // Create the Amazon S3 bucket.
      const data = await client.send(new CreateBucketCommand(bucketParams))

      const policy = {
        Version: '2012-10-17',
        Statement: [
          {
            Action: ['s3:GetObject'],
            Effect: 'Allow',
            Principal: '*',
            Resource: [`arn:aws:s3:::${bucket_name}/*`],
            Sid: ''
          }
        ]
      }
      const bucketPolicyParams = {
        Bucket: bucket_name,
        Policy: JSON.stringify(policy)
      }
      await client.send(new PutBucketPolicyCommand(bucketPolicyParams))

      return data
    }

    return data // For unit tests.
  } catch (err) {
    console.error('Error', err)
  }
}

module.exports = checkOrCreateBucket
