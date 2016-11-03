const expect = require('chai').expect;
const deepFreeze = require('deep-freeze');
const setLandmarkData = require('../setLandmarkData');

const state = {
    imageUrl: 'foo.jpg',
    landmarks: [
        {
            id: '1',
            color: '#000000'
        },
        {
            id: '2',
            title: 'Foo bar'
        }
    ]
};

deepFreeze(state);

describe('setLandmarkData action', () => {
    it('should merge the given data onto the existing landmark data', () => {
        const actualState = setLandmarkData(state, {
            id: '1',
            data: {
                color: '#778888',
                title: 'FOOBAR'
            }
        });

        expect(actualState.landmarks[0]).to.deep.equal({
            id: '1',
            color: `#778888`,
            title: `FOOBAR`
        });
    });

    it('should do nothing if no id is given or missing', () => {
        expect( setLandmarkData(state, { id: 'foo', data: { color: '#778888' } })).to.equal(state);
        expect( setLandmarkData(state, { data: { color: '#778888' } })).to.equal(state);
    });

    it('should do nothing if nothing is given for data', () => {
        expect( setLandmarkData(state, { id: '2' })).to.equal(state);
    });
});