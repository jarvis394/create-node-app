const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000

app.use(express.static('public'))

app.get('/', (request, response) => {
  response.status(200).send('Hello World')
})

const listener = app.listen(PORT, () => {
  console.log('Running at ' + PORT)
})
