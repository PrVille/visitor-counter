const express = require("express")
const cors = require('cors')
const client = require("./client")

const app = express()
const PORT = 3001

app.use(cors())

app.get("/", async (req, res) => {
  res.send("<h3>Visitor Counter API</h3>")
})

app.get("/visitors/:key", async (req, res) => {
  const value = await client.get(req.params.key)

  if (!value) {
    return res.status(404).send("-1")
  }

  res.send(value.toString())
})

app.post("/register/:key", async (req, res) => {
  const value = await client.get(req.params.key)

  if (!!value) {
    return res.status(401).send(`Key "${req.params.key}" already exists!`)
  }

  await client.set(req.params.key, 0)
  res.send("0")
})

app.post("/increment/:key", async (req, res) => {
  const value = await client.incr(req.params.key)
  res.send(value.toString())
})

app.post("/reset/:key", async (req, res) => {
  await client.set(req.params.key, 0)
  res.send("0")
})

const start = async () => {
  await client.connect()
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
  })
}

start()

module.exports = app
