const ACTION_TYPES = {
    SetPoint: 'setPoint',
    CreateLandmark: 'createLandmark',
    SelectLandmark: 'selectLandmark',
    SetLandmarkData: 'setLandmarkData',
    SetScalingMode: 'setScalingMode',
    AddScalePoint: 'addScalePoint',
    SetDistanceUnit: 'setDistanceUnit'
};

const ACTIONS = {
    [ACTION_TYPES.SetPoint]: require('./setPoint'),
    [ACTION_TYPES.CreateLandmark]: require('./createLandmark'),
    [ACTION_TYPES.SelectLandmark]: require('./selectLandmark'),
    [ACTION_TYPES.SetLandmarkData]: require('./setLandmarkData'),
    [ACTION_TYPES.SetScalingMode]: require('./setScalingMode'),
    [ACTION_TYPES.AddScalePoint]: require('./addScalePoint'),
    [ACTION_TYPES.SetDistanceUnit]: require('./setDistanceUnit')
};

module.exports = { ACTION_TYPES, ACTIONS };