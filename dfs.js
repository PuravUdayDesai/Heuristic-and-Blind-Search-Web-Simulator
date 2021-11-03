"use strict";

const Stack = require('./stack');
const Graph = require('./convert_node_to_map');
const utils = require('./utils');
const searchNode = require('./search_node');

function depthFirstSearch(initialState, goalTest, actions, successor) {
    // The fringe is a Stack
    let fringe = new Stack();

    // initialState and the goal is the same
    if (goalTest(initialState, goal)) {
        return [initialState];
    }

    // Add the initialState to the fringe.
    fringe.push(new searchNode(null, initialState, null));
    let expanded = [];

    while (!fringe.isEmpty()) {
        // Pop an element out of the stack to expand.
        let parent = fringe.pop();
        let newChildStates = [];

        // Child states of the current node
        let actionsList = actions(Graph, parent.state);

        // Add the node to the expanded list to prevent re-expansion.
        expanded.push(parent.state);

        // Create successors of each node and push them onto the fringe.
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

            // Push new successors to the fringe.
            else {
                newChildStates.push(newS);
                fringe.push(newN);
            }
        }
    }
}

let start = "START";
let goal = "DESTINATION";

console.log(depthFirstSearch(start, utils.goalTest, utils.actions, utils.successor));
