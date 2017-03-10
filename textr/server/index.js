'use strict';

/** Questions:
 1) To what extent are require statements deprecated in favor of import statements? Why couldn't import statements work here?
 2) To what extent is ejs deprecated in favor of done.js?
*/

/** Glossary:
 - body-parser: middleware to parse form input onto a body property of the JSONified (stringified) request.
 - ejs: HTML templating tool.
 - Socket.io: enabling server API <-> browser/client API "real-time bidirectional event-based communication."
*/

// Setup
const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Nexmo = require('nexmo');
const socketio = require('socket.io');

const app = express();
const server = app.listen(4000, () => {
  console.log('Express server listening on port %d in %s mode',
              server.address().port, app.settings.env);
});

// Nexmo configs
const nexmo = new Nexmo({
  apiKey: config.API_KEY,
  apiSecret: config.API_SECRET,
}, {debug: true});

// Socket.io configs
const io = socketio(server);
io.on('connection', (socket) => {
  console.log('Socket connected');
  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });
});

// Express configs
app.set('views', __dirname + '/../views');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Express routes //
// 1) GET request: Serving HTML
app.get('/', (req, res) => {
  res.render('index');
});
// 2) POST request: Take form input values from request
app.post('/', (req, res) => {
  res.send(req.body);
  // console.log(req.body);
  let toNumber = req.body.number;
  let text = req.body.text;
  let data = {};

  // Sending SMS via Nexmo
  nexmo.message.sendSms(
    config.NUMBER, toNumber, text, {type: 'unicode'},
    (err, responseData) => {
      if (err) {
        data = {error: err};
      } else {
        //console.dir(responseData);
        if (responseData.messages[0]['error-text']) {
          data = {error: responseData.messages[0]['error-text']};
        } else {
        // Socket.io
        let data = {id: responseData.messages[0]['message-id'],
                    number: responseData.messages[0]['to']};
        io.emit('smsStatus', data);
      }
    }
  );

  // // Nexmo basic number insight - info about the phone number
  // nexmo.numberInsight.get({level: 'basic', number: toNumber},
  //                         (err, responseData) => {
  //                           if (err) console.log(err);
  //                           else {
  //                             console.dir(responseData);
  //                           }
  //                         });
});
