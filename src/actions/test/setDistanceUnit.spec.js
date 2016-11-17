const expect = require( 'chai' ).expect;
const deepFreeze = require( 'deep-freeze' );
const setDistanceUnit = require('../setDistanceUnit');
const Constants = require('../../constants');

const initialState = {
    distanceUnit: 'mm'
};
deepFreeze(initialState);

describe('setDistanceUnit action', () => {
    it('should set the distance unit on the state', () => {
        const expectedUnit = Constants.DistanceUnits[ Constants.DistanceUnits.length - 1 ];
        const actualState = setDistanceUnit(initialState, expectedUnit);
        expect(actualState.distanceUnit).to.equal(expectedUnit);
    });

    it('should do nothing if given a unit that is not in the distance units constant', () => {
        const actualState = setDistanceUnit(initialState, Math.random().toString(36));
        expect(actualState).to.equal(initialState);
    });
});