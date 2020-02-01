const WebSocket = require('ws')
const mongoose = require('mongoose')

const config = require('./config.json')
const client = require('./client')

mongoose.connect(config.mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
mongoose.set('useCreateIndex', true)

const wss = new WebSocket.Server({ port: config.port })

wss
  .on('connection', ws => {
    console.log('New connection')
    ws.sendJson = obj => ws.send(JSON.stringify(obj))
    ws.on('message', msg => {
      console.log(`Received: ${msg}`)
      try {
        const obj = JSON.parse(msg)
        if (!obj.op) throw 'No op'
        client.emit(obj.op, ws, obj)
      } catch (error) {
        // The payload is not in valid JSON format
        console.warn('Invalid payload, closing')
        ws.terminate()
        return
      }
    })
    ws.send('Message received!')
  })
  .on('listening', () => {
    console.log(`Listening on ${config.port}...`)
  })
