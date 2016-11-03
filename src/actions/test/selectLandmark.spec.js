const expect = require('chai').expect;
const deepFreeze = require('deep-freeze');
const selectLandmark = require('../selectLandmark');

describe('selectLandmark action', () => {
    it('should set the selected landmark', () => {
        const state = {
            landmarks: [
                {
                    id: '1',
                    color: '#888888'
                }
            ]
        };

        deepFreeze(state);

        const actualState = selectLandmark(state, '1');

        expect(actualState.selectedLandmarkId).to.equal('1');
    });

    it('should do nothing if the landmark is not valid', () => {
        const state = {
            landmarks: [
                {
                    id: '1',
                    color: '#888888'
                },
                {
                    id: '2',
                    color: '#123123'
                }
            ]
        };

        deepFreeze(state);

        expect(selectLandmark(state, 'foo')).to.equal(state);
        expect(selectLandmark(state, {})).to.equal(state);
        expect(selectLandmark(state, {color: '#888888'})).to.equal(state);
        expect(selectLandmark(state, '3')).to.equal(state);
    })
});