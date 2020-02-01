const WebSocket = require('ws')

const ws = new WebSocket('ws://35.224.20.164:8000')

ws.on('open', () => {
  ws.send('Hello World!')
})

ws.on('message', data => {
  console.log(data)
})
