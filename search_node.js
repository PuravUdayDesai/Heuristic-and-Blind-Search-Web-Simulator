/*
searchNodes are created during the algorithm's search.
    this.action = the action taken to reach this node from the previous
    search node
    this.state = node name
    this.parent = the previous node in the search
*/

class searchNode {
    constructor(action, state, parent) {
        this.action = action;
        this.state = state;
        this.parent = parent;
    }

    // Returns a list of pairs corresponding to
    // the path starting at the top (root) of the tree.
    path() {
        if (this.parent === null) {
            return [this.state];
        } else {
            return this.parent.path() + " -> " + [this.state, this.action.cost];
        }
    }

    pathCost() {
        if (this.parent === null) {
            return 0;
        } else {
            return this.parent.pathCost() + parseInt(this.action.cost);
        }
    }

    // Returns true if the state occurs anywhere in the path
    // from the root to the node.
    inPath(findState) {
        if (findState == this.state) {
            return true;
        } else if (this.parent == null) {
            return false;
        } else {
            return this.parent.inPath(findState);
        }
    }
}

module.exports = searchNode;