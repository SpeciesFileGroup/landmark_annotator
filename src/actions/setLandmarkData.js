const validCollectionId = require('../utils/isValidCollectionId');

function setLandmarkData(state, args) {
    const { id, data } = args;
    if (!validCollectionId(state.landmarks, id) || !dataValid(data))
        return state;

    const landmarks = state.landmarks.map(l => {
        return l.id === id ? Object.assign({}, l, data) : l;
    });
    return Object.assign({}, state, { landmarks });
}

function dataValid(data) {
    return !data ? false : true;
}

module.exports = setLandmarkData;