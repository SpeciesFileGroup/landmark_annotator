const generateUUID = require('../utils/generateId');

function createLandmark(state, args = {}) {
    const oldLandmarks = (state.landmarks || []);
    const landmarks = oldLandmarks.concat( [ { id: generateUUID() } ] );
    return Object.assign({}, state, { landmarks });
}

module.exports = createLandmark;