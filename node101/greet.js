var greetings = require('./greetings');

var greet = function() {
  greetings.english();
  greetings.spanish();
};
greet();
// "exposing" greet - making it available for use outside this module.
module.exports = greet;
