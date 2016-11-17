const expect = require( 'chai' ).expect;
const deepFreeze = require( 'deep-freeze' );
const addScalePoint = require('../addScalePoint');

const stateWithNoScale = {
    imageUrl: '//placebacon.net/4000/3000'
};
deepFreeze(stateWithNoScale);

const testFirstPoint = [200, 200];
const testSecondPoint = [200, 600];
const distanceBetweenPoints = 400;

describe('addScalePoint action', () => {
    it('should add the first scale point in an array', () => {
        const actualState = addScalePoint(stateWithNoScale, testFirstPoint);
        expect(actualState.currentScalePoint).to.deep.equal(testFirstPoint);
    });

    it('should return the same state if the point is not valid', () => {
        const emptyArray = addScalePoint(stateWithNoScale, []);
        expect(emptyArray).to.equal(stateWithNoScale);

        const noArg = addScalePoint(stateWithNoScale);
        expect(noArg).to.equal(stateWithNoScale);

        const notLength2 = addScalePoint(stateWithNoScale, [6]);
        expect(notLength2).to.equal(stateWithNoScale);
    });

    it('should calculate the distance between the points if a point is added while one is already set', () => {
        const actualState = addScalePoint(addScalePoint(stateWithNoScale, testFirstPoint), testSecondPoint);
        expect(actualState.currentScalePoint).to.be.null;
        expect(actualState.scaleDistance).to.equal(distanceBetweenPoints);
        expect(actualState.isSettingScale).to.equal(false);
    });
});