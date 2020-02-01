const WebSocket = require('ws')
const mongoose = require('mongoose')

const config = require('./config.json')

mongoose.connect(config.mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
mongoose.set('useCreateIndex', true)

const wss = new WebSocket.Server({ port: config.port })

wss
  .on('connection', ws => {
    ws.on('message', msg => {
      console.log('received: %s', msg)
    })
    ws.send('Message received!')
  })
  .on('listening', () => {
    console.log(`Listening on ${config.port}...`)
  })
