const http = require('http');
const PORT = process.env.PORT || 4000;
 
const server = http.createServer((request, response) => {
  response.end(200)
})
 
server.listen(PORT, () => {
  console.log('Running at ' + PORT);
});
