"use strict";

const PriorityQueue = require('./priority_queue');
const Graph = require('./convert_node_to_map');
const utils = require('./utils');
const searchNode = require('./search_node');

function uniformCostSearch(initialState, goalTest, actions, successor) {
    // The fringe is a Priority Queue
    let fringe = new PriorityQueue();

    if (goalTest(initialState, goal)) {
        return [initialState];
    }

    // Enqueue the initialState to the fringe.
    fringe.enqueue(new searchNode(null, initialState, null));

    let expanded = [];

    // object to store the shortest path and its cost
    let shortestPath = { state: null, pathCost: null, path: null };

    while (!fringe.isEmpty()) {
        // Dequeue an element out of the queue to expand.
        let parent = fringe.dequeue();

        let newChildStates = [];

        // Child states of the current node
        let actionsList = actions(Graph, parent.state);

        // Add the node to the expanded list to prevent re-expansion.
        expanded.push(parent.state);

        // Create successors of each node and push them onto the fringe.
        for (let i = 0; i < actionsList.length; i++) {
            let newS = successor(parent.state, actionsList[i]);
            let newN = new searchNode(actionsList[i], newS, parent);

            if (goalTest(newS, goal)) {
                // If current path cost is less than that of the earlier; otherwise if no shortest
                // path has been found yet, then update/store the shortest path
                if (newN.pathCost() < shortestPath.pathCost || shortestPath.pathCost === null) {
                    shortestPath.pathCost = newN.pathCost();
                    shortestPath.path = newN.path();
                    shortestPath.state = newS;
                }
            }

            // If the successor is already expanded, don't add it to the fringe.
            else if (expanded.indexOf(newS) !== -1)
                continue;

            // Push new successors to the fringe.
            else {
                newChildStates.push(newS);
                fringe.enqueue(newN);
            }
        }
    }

    if (shortestPath.pathCost === null) {
        return "Couldn not find path.";
    } else {
        return shortestPath.path + " with path cost " + shortestPath.pathCost;
    }
}

let start = "START";
let goal = "DESTINATION";

console.log(uniformCostSearch(start, utils.goalTest, utils.actions, utils.successor));