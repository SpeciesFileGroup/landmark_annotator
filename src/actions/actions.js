const ACTION_TYPES = {
    AddPoint: 'addPoint',
    CreateLandmark: 'createLandmark',
    SelectLandmark: 'selectLandmark',
    SetLandmarkData: 'setLandmarkData'
};

const ACTIONS = {
    [ACTION_TYPES.AddPoint]: require('./addPoint'),
    [ACTION_TYPES.CreateLandmark]: require('./createLandmark'),
    [ACTION_TYPES.SelectLandmark]: require('./selectLandmark'),
    [ACTION_TYPES.SetLandmarkData]: require('./setLandmarkData')
};

module.exports = { ACTION_TYPES, ACTIONS };