const ScaleConverter = require('../ScaleConverter');
const expect = require('chai').expect;

const pixelX = Math.floor( Math.random() * 2000 );
const pixelY = Math.floor( Math.random() * 1500 );
const pixelDistance = 400;
const pixelImageSize = [2000, 1500];

const trueX = pixelX * 2;
const trueY = pixelY * 2;
const trueDistance = pixelDistance * 2;
const trueImageSize = pixelImageSize.map(d => d * 2);

const missingTrueError = `Missing trueImageSize argument`;
const missingPixelError = `Missing pixelImageSize argument`;

describe('convertPoints util class', () => {
    let pc;

    before(() => {
        pc = new ScaleConverter({ pixelImageSize, trueImageSize });
    });

    it('should throw an error if trueImage and pixelImage are empty', () => {
        const missingTrue = () => {
            new ScaleConverter({ pixelImageSize });
        };

        expect(missingTrue).to.throw(missingTrueError);

        const missingPixel = () => {
            new ScaleConverter({ trueImageSize });
        };

        expect(missingPixel).to.throw(missingPixelError);
    });

    describe('converting pixel coordinates to true coordinate', () => {
        it('should take a pixel coordinate and convert it to the true coordinate', () => {
            const actual = pc.pointToTrue([pixelX, pixelY]);
            expect(actual).to.deep.equal([trueX, trueY]);
        });

        it('should round the coordinate to the nearest integer', () => {
            const actual = pc.pointToTrue([1500.2, 500.75]);
            expect(actual).to.deep.equal([3000, 1002]);
        });
    });

    describe('converts true coordinates to pixel coordinates', () => {
        it('should take a true coordinate and convert it to the pixel coordinate', () => {
            const actual = pc.pointToPixel([trueX, trueY]);
            expect(actual).to.deep.equal([pixelX, pixelY]);
        });
    });

    describe('converting true distances to pixel distances', () => {
        it('should take a distance and convert it to the pixel distance', () => {
            const actual = pc.distanceToPixel(trueDistance);
            expect(actual).to.equal(pixelDistance);
        });
    });
});