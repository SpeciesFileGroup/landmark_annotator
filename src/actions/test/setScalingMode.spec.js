const expect = require( 'chai' ).expect;
const deepFreeze = require( 'deep-freeze' );
const setScalingMode = require('../setScalingMode');

const initialState = {
    imageUrl: `//placebacon.net/4000/300`,
    currentScalePoint: [ 1, 2 ]
};
deepFreeze(initialState);

describe('setScalingMode action', () => {
    it('should set the scaling mode to the given boolean', () => {
        const actualStateTrue = setScalingMode(initialState, true);
        expect(actualStateTrue.isSettingScale).to.be.true;

        const actualStateFalse = setScalingMode(initialState, false);
        expect(actualStateFalse.isSettingScale).to.be.false;
    });

    it('should remove the current scale point if there is one', () => {
        const actualState = setScalingMode(initialState, false);
        expect(actualState.isSettingScale).to.be.false;
        expect(actualState.currentScalePoint).to.be.null;
    });
});