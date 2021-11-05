const Graph = require('./convert_node_to_map');
const utils = require('./utils');
const PriorityQueue = require('./astar_priority_queue')
const searchNode = require('./search_node');


function aStarSearch(initialState, goalTest, actions, successor) {
    // The fringe is a Priority Queue
    // Actions other than shift() and enqueue() are prohibited.
    let fringe = new PriorityQueue();
    if (goalTest(initialState, goal)) {
        return [initialState];
    }

    // Add the initialState to the fringe.
    fringe.enqueue(new searchNode(null, initialState, null));
    let expanded = [];
    let shortestPath = {state: null, pathCost: null, path: null};

    while (!fringe.isEmpty()) {
        // Pop an element out of the queue to expand.
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

            // If the goal is found, returns the path to the goal.
            if (goalTest(newS, goal)) {
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
        return "Couldn't find path."
    } else {
        return shortestPath.path + " with path cost " + shortestPath.pathCost;
    }
}

let start = "START";
let goal = "DESTINATION";

console.log(aStarSearch(start, utils.goalTest, utils.actions, utils.successor));
