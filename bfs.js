"use strict";

const Queue = require('./queue');
const Graph = require('./convert_node_to_map');
const utils = require('./utils');
const searchNode = require('./search_node');

function breadthFirstSearch(initialState, goalTest, actions, successor) {
    // The fringe is a Queue
    let fringe = new Queue();

    // initialState and the goal is the same
    if (goalTest(initialState, goal)) {
        return [initialState];
    }

    // Add the initialState to the fringe.
    fringe.enqueue(new searchNode(null, initialState, null));
    let expanded = [];

    while (!fringe.isEmpty()) {
        // Dequeue an element out of the queue to expand.
        let parent = fringe.dequeue();
        let newChildStates = [];

        // Child states of the current node
        let actionsList = actions(Graph, parent.state);

        // Add the node to the expanded list to prevent re-expansion.
        expanded.push(parent.state);

        // Create successors of each node and enqueue them onto the fringe.
        for (let i = 0; i < actionsList.length; i++) {
            let newS = successor(parent.state, actionsList[i]);
            let newN = new searchNode(actionsList[i], newS, parent);

            // If the goal is found, returns the path to the goal.
            if (goalTest(newS, goal)) {
                console.log(`Found ${newS}!`);
                return `${newN.path()} with path cost ${newN.pathCost()}.`;
            }

            // If the successor is already expanded, don't add it to the fringe.
            else if (expanded.indexOf(newS) !== -1)
                continue;

            // If the successor is already in the fringe, don't add it to the fringe again.
            else if (!fringe.contains(newN))
                continue;

            // Enqueue new successors to the fringe.
            else {
                newChildStates.push(newS);
                fringe.enqueue(newN);
            }
        }
    }
}

let start = "START";
let goal = "DESTINATION";

console.log(breadthFirstSearch(start, utils.goalTest, utils.actions, utils.successor));
