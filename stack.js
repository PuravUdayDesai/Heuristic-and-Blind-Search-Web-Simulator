// Simple Stack Data Structure in JS
class Stack {
    constructor() {
        this.elements = [];
    }
    
    // push an element to the stack
    push(element) {
        return this.elements.push(element);
    }
    
    // pop an element from the stack
    pop() {
        if(this.elements.length > 0) {
            return this.elements.pop();
        }
    }
    
    // check if the stack is empty
    isEmpty(){
       return this.elements.length == 0;
    }

    // check if the obj is in the stack
    contains(obj) {
        return this.elements.map(function(item) { return item.state }).indexOf(obj.state) === -1;
    }
}

module.exports = Stack
