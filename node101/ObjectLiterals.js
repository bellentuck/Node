// object literal
var person = {
  firstname: 'Jehusiphat',
  lastname: 'Oranges',
  politelyRidicule: function() {
    console.log('And you must be ' + this.firstname + ' ' + this.lastname + '. Good riddance!');
  }
};

// equivalent object calls:
person.politelyRidicule();
person['politelyRidicule']();
