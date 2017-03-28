/**************
STAND UP AN EXPRESS SERVER:
**************/

// A. pull in express
const express = require('express');

// B. make a new express application
const app = express();

// C. tell express to listen in on port 4000
app.listen(4000, () => {
  console.log('Listening');
});

/**************************************/
