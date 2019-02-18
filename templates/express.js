const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

const listener = app.listen(PORT, () => {
  console.log('Running at ' + PORT);
});
