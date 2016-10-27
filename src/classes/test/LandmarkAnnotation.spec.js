const expect = require('chai').expect;
const LandmarkAnnotation = require('../LandmarkAnnotation');
const Landmark = require('../Landmark');

describe('LandmarkAnnotation', () => {
    it('should be a class', () => {
        expect(LandmarkAnnotation).to.be.a('function');
    });

    it('should construct empty', () => {
        const la = new LandmarkAnnotation();
        assertDefault(la);
    });

    describe('landmarks', () => {
        it('should construct Landmark classes with landmark data', () => {
            const landmarks = [ {}, {} ];
            const la = new LandmarkAnnotation({ landmarks });
            la.landmarks.forEach(l => {
                expect(l).to.be.instanceOf(Landmark);
            })
        });
    });
});

function assertDefault(la) {
    expect(la.landmarks).to.deep.equal([]);
    expect(la.imageUrl).to.deep.equal('');
    expect(la.distancePerPixel).to.equal(0.01);
    expect(la.distanceUnit).to.equal('mm');
}