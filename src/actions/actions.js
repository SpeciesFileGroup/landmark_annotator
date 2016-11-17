const ACTION_TYPES = {
    SetPoint: 'setPoint',
    CreateLandmark: 'createLandmark',
    SelectLandmark: 'selectLandmark',
    SetLandmarkData: 'setLandmarkData',
    AddScalePoint: 'addScalePoint'
};

const ACTIONS = {
    [ACTION_TYPES.SetPoint]: require('./setPoint'),
    [ACTION_TYPES.CreateLandmark]: require('./createLandmark'),
    [ACTION_TYPES.SelectLandmark]: require('./selectLandmark'),
    [ACTION_TYPES.SetLandmarkData]: require('./setLandmarkData'),
    [ACTION_TYPES.AddScalePoint]: require('./addScalePoint')
};

module.exports = { ACTION_TYPES, ACTIONS };