const calcDistance = require('../calculateDistance');
const expect = require('chai').expect;

describe('calcDistance function', () => {
    const magicX = 50;
    const magicY = 120;

    const samplePointOne = {
        x: magicX,
        y: 50
    };

    const samplePointTwo = {
        x: magicX,
        y: magicY
    };

    const samplePointThree = {
        x: 100,
        y: magicY
    };

    const samplePointFour = {
        x: 200,
        y: 200
    };

    it('should be a function', () => {
        expect(calcDistance).to.be.a('function');
    });

    describe('points that have the same x or y', () => {
        it('should return the y difference if x are the same', () => {
            const actual = calcDistance(samplePointOne, samplePointTwo);
            expect(actual).to.equal(70);
        });

        it('should return the x different if y are the same', () => {
            const actual = calcDistance(samplePointTwo, samplePointThree);
            expect(actual).to.equal(50);
        });
    });
});