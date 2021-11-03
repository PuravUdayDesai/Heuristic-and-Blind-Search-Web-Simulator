// Simple PriorityQueue Data Structure in JS
function PriorityQueue() {
    this.elements = [];
};

// insert item based on the path cost of search nodes currently in the queue
// search nodes with low path cost have higher priority
PriorityQueue.prototype.enqueue = function(item) {
    for (let i = 0; i < this.elements.length; i++) {
        if (item.pathCost() < this.elements[i].pathCost())
            return this.elements.splice(i, 0, item);
    }

    return this.elements.push(item);
};

// check if the queue is empty
PriorityQueue.prototype.isEmpty = function() {
    return this.elements.length == 0;
};

PriorityQueue.prototype.length = function() {
    return this.elements.length;
};

// remove an element from the front of the queue
PriorityQueue.prototype.dequeue = function() {
    return this.elements.shift();
};

// check if the obj is present in the queue
PriorityQueue.prototype.contains = function(obj) {
    return this.elements.map(function(item) { return item.state }).indexOf(obj.state) === -1;
};

module.exports = PriorityQueue;