const WebSocket = require('ws')

const ws = new WebSocket('ws://35.224.20.164:8000')

ws.on('open', () => {
  const obj = {
    op: 'register',
    id: 'abc@qwe.ca',
    pw: '123qwe',
    fn: 'John',
    ln: 'Doe',
    education: [
      {
        name: 'Bachelor of Science',
        startingYear: 2019,
        endingYear: 2022,
        description: 'CS',
        institution: 'McGill',
      },
    ],
  }
  ws.send(JSON.stringify(obj))
})

ws.on('message', data => {
  console.log(data)
})
