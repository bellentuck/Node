// Handling form submission

// Get DOM object for each form input element
var numberField = document.querySelector('input[name=number]');
var textField = document.querySelector('input[name=text]');
var button = document.querySelector('input[type=button]');
var msg = document.querySelector('.response');

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
  var text = textField.value;
  // 2) Post values to server via Fetch API
  fetch('/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stingify({number: number, text: text})
  })
  .then(function(res){ console.log(res) })
  .catch(function(error){ console.log(error)});
}
