const restify = require('restify')
const PORT = process.env.PORT || 4000

const respond = (req, res, next) => {
  res.send('Hello ' + req.params.name)
  
  next()
}

var server = restify.createServer()
server.get('/hello/:name', respond)

server.listen(PORT, () => {
  console.log('Running at ' + PORT)
})
