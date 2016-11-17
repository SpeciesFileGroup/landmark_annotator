const Constants = require('../constants');

function setDistanceUnit(state, distanceUnit) {
    if (Constants.DistanceUnits.indexOf(distanceUnit) === -1)
        return state;

    return Object.assign({}, state, { distanceUnit });
}

module.exports = setDistanceUnit;