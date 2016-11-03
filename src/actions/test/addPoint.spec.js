const addPoint = require('../addPoint');
const expect = require('chai').expect;
const deepFreeze = require('deep-freeze');

const stateWithoutSelected = {
    imageUrl: 'foo/bar/baz.png',
    landmarks: [
        {
            id: '1'
        },
        {
            id: '2'
        }
    ]
};
const stateWithSelected = Object.assign({}, stateWithoutSelected, { selectedLandmarkId: '2' });
deepFreeze(stateWithoutSelected);
deepFreeze(stateWithSelected);

const point = [50, 50];

describe(`addPoint Action`, () => {
    it('should be a function', () => {
        expect(addPoint).to.be.a(`function`);
    });

    it('should do nothing if no landmark is selected', () => {
        expect( addPoint(stateWithoutSelected, point )).to.equal(stateWithoutSelected);
        expect( addPoint(stateWithoutSelected, point )).to.equal(stateWithoutSelected);
    });

    it('should add the point to the landmark', () => {
        const actualState = addPoint(stateWithSelected, point);
        expect(actualState.landmarks[1]).to.deep.equal({
            id: '2',
            points: [
                [50, 50]
            ]
        });
    });

    it('should be able to add many points  to a landmark', () => {
        const actualState = addPoint( addPoint( addPoint( addPoint(stateWithSelected, point ), point ), point ), point );
        expect(actualState.landmarks).to.deep.equal([
            {
                id: '1'
            },
            {
                id: '2',
                points: [
                    [50, 50],
                    [50, 50],
                    [50, 50],
                    [50, 50]
                ]
            }
        ]);
    });
});