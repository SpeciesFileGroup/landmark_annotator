function setScalingMode(state, isScaling) {
    const currentScalePoint = isScaling ? state.currentScalePoint : null;
    return Object.assign({}, state, { isScaling, currentScalePoint });
}

module.exports = setScalingMode;