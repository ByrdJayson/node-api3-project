const express = require('express')
const useRouter = require('./users/users-router')
const {logger} = require('./middleware/middleware')
const server = express()

server.use(express.json())
server.use(logger)
server.use('/api/users', useRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
})
module.exports = server;