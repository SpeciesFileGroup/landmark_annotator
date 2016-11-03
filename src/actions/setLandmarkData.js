function setLandmarkData(state, args) {
    const { id, data } = args;
    if (!idValid(state, id) || !dataValid(data))
        return state;

    const landmarks = state.landmarks.map(l => {
        return l.id === id ? Object.assign({}, l, data) : l;
    });
    return Object.assign({}, state, { landmarks });
}

function idValid(state, id) {
    if (!id)
        return false;

    return state.landmarks.findIndex(l => l.id === id) !== -1;
}

function dataValid(data) {
    return !data ? false : true;
}

module.exports = setLandmarkData;