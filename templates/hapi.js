const Hapi = require('hapi')
const PORT = process.env.PORT || 4000

const server = Hapi.server({
  host: 'localhost',
  port: PORT
})

server.route({
  method: 'GET',
  path: '/hello',
  handler: (request, h) => 'World!'
})

// Start the server
const start = async () => {
  try {
    await server.start()
  } catch (err) {
    console.log(err)
    process.exit(1)
  }

  console.log('Running at ', server.info.port)
}

start()