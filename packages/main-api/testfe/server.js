const express = require('express');
const path = require('path');

const app = express();

app.listen(8080, () => {
  console.info('Running on port 8080');
});

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'index.html'));
});
