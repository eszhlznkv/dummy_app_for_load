'use strict';
//heroku logs -n 10 -a dummyload |  grep -o 'Running on this port [0-9]\+' | sed -e 's/[^0-9]//g'
const express = require('express');

// Constants
const PORT = process.env.PORT || 8080;
//const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello Load Otus!');
});

app.get('/secret', (req, res) => {
    res.send('Secrets');
  });

app.post('/', function (req, res) {
    res.send('POST request to the homepage');
  });

app.listen(PORT);
console.log(`Running on this port ${PORT}`);
