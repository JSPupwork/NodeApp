require('dotenv').config()

const app = require('./app')

app.listen(process.env.PORT || 3000, '::', err => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  app.swagger()
})
