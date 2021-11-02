// Simple Queue Data Structure in JS
function Queue() {
    this.elements = [];
};

Queue.prototype.enqueue = function(e) {
    this.elements.push(e);
};

// check if the queue is empty
Queue.prototype.isEmpty = function() {
    return this.elements.length == 0;
};

Queue.prototype.length = function() {
    return this.elements.length;
};

// remove an element from the front of the queue
Queue.prototype.dequeue = function() {
    return this.elements.shift();
};

Queue.prototype.contains = function(obj) {
    return this.elements.map(function(item) { return item.state }).indexOf(obj.state) === -1;
};

module.exports = Queue