function goalTest(state, goal) {
    return state === goal;
}

function actions(Graph, state) {
    // Returns an array of objects
    // [{ name: string, cost: integer }, ... ]
    return Graph.get(state);
}

function successor(state, action) {
    return action.name;
}

module.exports = {
    goalTest: goalTest,
    actions: actions,
    successor: successor
};