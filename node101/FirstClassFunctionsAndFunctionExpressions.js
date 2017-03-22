// function statement
function greet() {
  console.log('Hi');
}
greet();

// functions are first-class
function logGreeting(fn) {
  fn();
}
logGreeting(greet);

// function expression
var greetMe = function() {
  console.log('Hi, Bean');
}
greetMe();

// it's first-class
logGreeting(greetMe);

// use a function expression on the fly
logGreeting(function() {
  console.log('Hi on the fly!');
});

// // named function expression
// // standing question: how to return the actual result, instead of undefined?
// var factorial = function factorial(n=3) {
//   if (n <= 1)
//     return 1;
//   return n * factorial(n - 1);
// };
//
// function logAnswer(fn) {
//   fn();
// }
// var a = logAnswer(factorial);
// console.log(a);
