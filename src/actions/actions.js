const ACTION_TYPES = {
    AddPoint: 'addPoint',
    CreateLandmark: 'createLandmark',
    SelectLandmark: 'selectLandmark'
};

const ACTIONS = {
    [ACTION_TYPES.AddPoint]: require('./addPoint'),
    [ACTION_TYPES.CreateLandmark]: require('./createLandmark'),
    [ACTION_TYPES.SelectLandmark]: require('./selectLandmark')

};

module.exports = { ACTION_TYPES, ACTIONS };