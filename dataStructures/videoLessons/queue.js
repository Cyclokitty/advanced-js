// Queue

function Queue() {
  collection = [];

  this.print = function() {
    console.log(collection);
  };

  this.enqueue = function(element) {
    collection.push(element);
  };

  this.dequeue = function() {
    return collection.shift();
  };

  this.front = function() {
    return collection[0];
  };

  this.size = function() {
    return collection.length;
  };

  this.isEmpty = function() {
    return (collection.length === 0);
  };

}

var dogs = new Queue();

dogs.enqueue('Wooferton');
dogs.enqueue('Lady Puffy');
dogs.enqueue('Tippy');
dogs.enqueue('Sassy');
console.log(dogs.isEmpty());
console.log(dogs.front());
console.log(dogs.size());
console.log(dogs.print());

// priority Queues
