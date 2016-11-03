function createLandmark(state, args = {}) {
    const oldLandmarks = (state.landmarkAnnotation.landmarks || []);
    const landmarks = oldLandmarks.concat( [ {} ] );

    const landmarkAnnotation = Object.assign({}, state.landmarkAnnotation, { landmarks });

    return Object.assign({}, state, { landmarkAnnotation });
}

module.exports = createLandmark;