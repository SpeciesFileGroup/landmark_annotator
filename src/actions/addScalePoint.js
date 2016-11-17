const calculateDistance = require('../utils/calculateDistance');

function addScalePoint(state, point) {
    if (!point || !(point instanceof Array) || point.length !== 2)
        return state;

    if (state.currentScalePoint) {
        const scaleDistance = calculateDistance(state.currentScalePoint, point);
        return Object.assign({}, state, {
            scaleDistance: scaleDistance,
            currentScalePoint: null,
            isSettingScale: false
        });
    } else
        return Object.assign({}, state, { currentScalePoint: point });
}

module.exports = addScalePoint;