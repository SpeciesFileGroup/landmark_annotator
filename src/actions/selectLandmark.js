function selectLandmark(state, landmarkId) {
    if (state.landmarks.find(l => l.id === landmarkId ))
        return Object.assign({}, state, { selectedLandmarkId: landmarkId });
    return state;
}

module.exports = selectLandmark;