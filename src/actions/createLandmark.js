function createLandmark(state, args = {}) {
    const oldLandmarks = (state.landmarkAnnotation.landmarks || []);
    const landmarks = oldLandmarks.concat( [ {} ] );

    return Object.assign({}, state, {
        landmarkAnnotation: { landmarks }
    });
}

module.exports = createLandmark;