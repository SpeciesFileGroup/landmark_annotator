const calcDistance = require('../calculateDistance');
const expect = require('chai').expect;

describe('calcDistance function', () => {
    const magicX = 50;
    const magicY = 120;

    const samplePointOne = [magicX, 50];

    const samplePointTwo = [magicX, magicY];

    const samplePointThree = [100, magicY];

    const samplePointFour = [200, 200];

    it('should be a function', () => {
        expect(calcDistance).to.be.a('function');
    });

    describe('points that have the same x or y', () => {
        it('should return the y difference if x are the same', () => {
            const actual = calcDistance(samplePointOne, samplePointTwo);
            expect(actual).to.equal(70);
        });

        it('should return the x difference if y are the same', () => {
            const actual = calcDistance(samplePointTwo, samplePointThree);
            expect(actual).to.equal(50);
        });

        it('should return the pythagorean distance if x and y are both different', () => {
            const actual = calcDistance(samplePointOne, samplePointFour);
            const actualInverse = calcDistance(samplePointFour, samplePointOne);
            const expected = 212.1;
            expect(actual).to.equal(expected);
            expect(actualInverse).to.equal(expected);
        });
    });
});