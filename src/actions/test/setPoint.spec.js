const setPoint = require('../setPoint');
const expect = require('chai').expect;
const deepFreeze = require('deep-freeze');

const stateWithoutSelected = {
    imageUrl: 'foo/bar/baz.png',
    landmarks: [
        {
            id: '1'
        },
        {
            id: '2',
            point: [30, 30]
        }
    ]
};
const stateWithSelected = Object.assign({}, stateWithoutSelected, { selectedLandmarkId: '2' });
deepFreeze(stateWithoutSelected);
deepFreeze(stateWithSelected);

const point = [50, 50];

describe(`addPoint Action`, () => {
    it('should be a function', () => {
        expect(setPoint).to.be.a(`function`);
    });

    it('should do nothing if no landmark is selected', () => {
        expect( setPoint(stateWithoutSelected, point )).to.equal(stateWithoutSelected);
        expect( setPoint(stateWithoutSelected, point )).to.equal(stateWithoutSelected);
    });

    it('should add the point to the landmark', () => {
        const actualState = setPoint(stateWithSelected, point);
        expect(actualState.landmarks[1]).to.deep.equal({
            id: '2',
            point: [50, 50]
        });
    });

    it('should be able to overwrite the point on the landmark', () => {
        const actualState = setPoint(stateWithSelected, point );
        expect(actualState.landmarks).to.deep.equal([
            {
                id: '1'
            },
            {
                id: '2',
                point: [50, 50]
            }
        ]);
    });

    it('should not accept points that are garbage', () => {
        const garbage = [
            setPoint(stateWithSelected, []),
            setPoint(stateWithSelected, [-5, 100]),
            setPoint(stateWithSelected, 'foo'),
            setPoint(stateWithSelected, [999])
        ];

        garbage.forEach(s => {
            expect(s).to.equal(stateWithSelected);
        });
    });
});