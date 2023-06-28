const { createClient } = require("redis")
require('dotenv').config()

const client = createClient({
  password: process.env.CLIENT_PW,
  socket: {
    host: "redis-13713.c250.eu-central-1-1.ec2.cloud.redislabs.com",
    port: 13713,
  },
})

module.exports = client