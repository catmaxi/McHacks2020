const WebSocket = require('ws')

const ws = new WebSocket('ws://35.224.20.164:8000')

ws.on('open', () => {
  const obj = {
    op: 'register',
    id: 'abc@qwe.ca',
    pw: '123qwe',
  }
  ws.send(JSON.stringify(obj))
})

ws.on('message', data => {
  console.log(data)
})
