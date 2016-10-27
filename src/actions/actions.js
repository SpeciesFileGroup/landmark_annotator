const ACTION_TYPES = {
    AddPoint: 'addPoint',
    CreateLandmark: 'createLandmark'
};

const ACTIONS = {
    [ACTION_TYPES.AddPoint]: require('./addPoint'),
    [ACTION_TYPES.CreateLandmark]: require('./createLandmark')
};

module.exports = { ACTION_TYPES, ACTIONS };