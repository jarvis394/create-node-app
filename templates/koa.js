const Koa = require('koa')
const app = new Koa()
const PORT = process.env.PORT || 4000

app.use(async ctx => {
  ctx.body = 'Hello World'
})

app.listen(PORT)
console.log('Running at ' + PORT)