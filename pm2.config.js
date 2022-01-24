module.exports = {
  apps: [
    {
      name: 'tc-api',
      script: './src/index.js',
      watch: false,
      instances: 'max',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
