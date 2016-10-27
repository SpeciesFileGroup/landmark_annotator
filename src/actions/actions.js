const ACTION_TYPES = {
    AddPoint: 'addPoint'
};

const ACTIONS = {
    [ACTION_TYPES.AddPoint]: require('./addPoint')
};

module.exports = { ACTION_TYPES, ACTIONS };