function setPoint(state, point) {
    if (!state.selectedLandmarkId)
        return state;

    if (!isValidPoint(point))
        return state;

    const landmarks = state.landmarks.map(l => {
        if (l.id !== state.selectedLandmarkId)
            return l;

        return Object.assign({}, l, { point });
    });

    return Object.assign({}, state, { landmarks });
}

function isValidPoint(point) {
    if (!(point instanceof Array))
        return false;

    if (point.length !== 2)
        return false;

    return point.every(coord => {
        return coord >= 0;
    });
}

module.exports = setPoint;