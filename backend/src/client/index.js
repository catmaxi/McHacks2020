const events = require('events')

const { getUser, newUser } = require('../lib/auth')

const client = new events.EventEmitter()

module.exports = client

client.on('login', async (ws, obj) => {
  console.log(`Trying to login to ${obj.id}`)
  try {
    const user = await getUser(obj.id, obj.pw)
    const payload = {
      res: 'Success',
      user,
    }
    ws.sendJson(payload)
  } catch (e) {
    const error = {
      err: 'Login failed',
    }
    ws.sendJson(error)
  }
})

client.on('register', async (ws, obj) => {
  console.log(`Trying to register as ${obj.id}`)
  try {
    const user = await newUser(obj.id, obj.pw)
    const payload = {
      res: 'Success',
      user,
    }
    ws.sendJson(payload)
  } catch (e) {
    const error = {
      err: 'Failed to register',
    }
    ws.sendJson(error)
  }
})
