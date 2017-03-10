(function() {
  'use strict';

// Handling form submission
// Get DOM object for each form input element
var numberField = document.querySelector('input[name=number]');
var textField = document.querySelector('input[name=text]');
var button = document.querySelector('input[type=button]');
var msg = document.querySelector('.response');

// Web Notifications permission request [W3C API]
var permission = 'denied';
try {
  Notification.requestPermission().then(function(status) {
    permission = status;
    console.log('Web notification status: ' + permission); // either 'granted' or 'denied'
  });
} catch (error) { // Safari 9 requestPermission doesn't return a promise
  Notification.requestPermission(function(status) {
    permission = status;
    console.log('Web notification status: ' + permission);
  });
}

// Socket.io - receive smsStatus event from server
var socket = io();
socket.on('connect', function() {
  console.log('Socket connected');
});
socket.on('smsStatus', function(data) {
  console.log(data);
  if (!data) return;
  if (data.error) {
    displayStatus('Error: ' + data.error, permission);
  } else {
    displayStatus('Message ID ' + data.id +
                  ' successfully sent to ' + data.number);
  }
});

// // Repopulate number field with most recent number
// var lastNumber = localStorage.getItem('number');
// if (lastNumber) {
//   numberField.value = lastNumber;
// }

// UI events
// Submit form via Return/Enter key...
textField.addEventListener('keyup', function(e) {
  if ((e.keycode || e.charCode) === 13) send();
}, false);
// ...or submit button
button.addEventListener('click', send, false);

// Send input values to Node server code, to send an SMS via Nexmo
function send() {
  // 1) Get values from inputs
  var number = numberField.value.replace(/\D/g, ''); // Remove non-numeric chars
  if (!number) return;
  var text = textField.value || 'Hey girl hey';
  //localStorage.setItem('number', number);

  // 2) Post values to server via Fetch API
  if (!self.fetch) {
    displayStatus("Sorry, your browser doesn't support the required Fetch API.");
    return;
    // XHR could work as fallback option
  }
  fetch('/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      number: number,
      text: text
    })
  }).then(function(res){ console.log(res) })
  .catch(function(error){ console.log(error) });
}

function displayStatus(message, notification) {
  console.log(notification);

  if (notification === 'granted') {
    var notification = new Notification('Nexmo', {
      body: message,
      icon: 'images/icon-nexmo.png'
    });
  } else { // if notification denied by user
    msg.classList.add('poof');
    msg.textContent = message;
    msg.addEventListener('animationend', function() {
      msg.textContent = '';
      msg.classList.remove('poof');
    }, false);
  }
}

})();
