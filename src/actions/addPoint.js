const validCollectionId = require('../utils/isValidCollectionId');

function addPoint(state, point) {
    if (!state.selectedLandmarkId)
        return state;

    const landmarks = state.landmarks.map(l => {
        if (l.id !== state.selectedLandmarkId)
            return l;

        const points = [...(l.points || []), point ];

        return Object.assign({}, l, { points });
    });

    return Object.assign({}, state, { landmarks });
}

module.exports = addPoint;