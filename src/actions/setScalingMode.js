function setScalingMode(state, isSettingScale) {
    const currentScalePoint = isSettingScale ? state.currentScalePoint : null;
    return Object.assign({}, state, { isSettingScale, currentScalePoint });
}

module.exports = setScalingMode;