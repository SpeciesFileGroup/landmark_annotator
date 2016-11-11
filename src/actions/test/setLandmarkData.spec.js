const expect = require('chai').expect;
const deepFreeze = require('deep-freeze');
const setLandmarkData = require('../setLandmarkData');
const testUtils = require('../../utils/testUtils');

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

    it('should not set a title that is already set on another landmark', () => {
        const usedTitle = "OCCUPIED";

        const state = {
            imageUrl: `http://www.placebacon.net/4000/3000`,
            landmarks: [
                Object.assign(testUtils.sampleLandmarkData(), { title: usedTitle }),
                { id: '2' }
            ]
        };

        const actualState = setLandmarkData(state, {
            id: '2',
            data: {
                title: usedTitle
            }
        });

        expect(actualState).to.equal(state);
    });
});