function Person(firstname, lastname) {
  this.firstname = firstname;
  this.lastname = lastname;
}

// prototype of any objects created *from* Person
Person.prototype.greet = function() {
  console.log('Hello, ' + this.firstname + ' ' + this.lastname);
};

var john = new Person('John', 'Doe');
john.greet();
var jane = new Person('Jane', 'Doe');
jane.greet();

console.log(john.__proto__);
// returns "Person { greet: [Function] }"
