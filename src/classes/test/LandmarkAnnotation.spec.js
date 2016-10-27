const expect = require('chai').expect;
const LandmarkAnnotation = require('../LandmarkAnnotation');

describe('LandmarkAnnotation', () => {
    it('should be a class', () => {
        expect(LandmarkAnnotation).to.be.a('function');
    });

    it('should construct empty', () => {
        const la = new LandmarkAnnotation();
        assertDefault(la);
    });
});

function assertDefault(la) {
    expect(la.landmarks).to.deep.equal([]);
    expect(la.imageUrl).to.deep.equal('');
    expect(la.distancePerPixel).to.equal(0.01);
    expect(la.distanceUnit).to.equal('mm');
}