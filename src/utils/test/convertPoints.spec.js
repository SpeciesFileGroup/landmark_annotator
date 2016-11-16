const PointConverter = require('../PointConverter');
const expect = require('chai').expect;

const pixelX = Math.floor( Math.random() * 2000 );
const pixelY = Math.floor( Math.random() * 1500 );
const pixelImageSize = [2000, 1500];

const trueX = pixelX * 2;
const trueY = pixelY * 2;
const trueImageSize = pixelImageSize.map(d => d * 2);

const missingTrueError = `Missing trueImageSize argument`;
const missingPixelError = `Missing pixelImageSize argument`;

describe('convertPoints util class', () => {
    let pc;

    before(() => {
        pc = new PointConverter({ pixelImageSize, trueImageSize });
    });

    it('should throw an error if trueImage and pixelImage are empty', () => {
        const missingTrue = () => {
            new PointConverter({ pixelImageSize });
        };

        expect(missingTrue).to.throw(missingTrueError);

        const missingPixel = () => {
            new PointConverter({ trueImageSize });
        };

        expect(missingPixel).to.throw(missingPixelError);
    });

    describe('converting pixel coordinates to true coordinate', () => {
        it('should take a pixel coordinate and convert it to the true coordinate', () => {
            const actual = pc.toTrue([pixelX, pixelY]);
            expect(actual).to.deep.equal([trueX, trueY]);
        });

        it('should round the coordinate to the nearest integer', () => {
            const actual = pc.toTrue([1500.2, 500.75]);
            expect(actual).to.deep.equal([3000, 1002]);
        });
    });

    describe('converts true coordinates to pixel coordinates', () => {
        it('should take a true coordinate and convert it to the pixel coordinate', () => {
            const actual = pc.toPixel([trueX, trueY]);
            expect(actual).to.deep.equal([pixelX, pixelY]);
        });
    });
});