const expect = require('chai').expect;
const LandmarkAnnotation = require('../LandmarkAnnotation');
const Landmark = require('../Landmark');
const testUtils = require('./testUtils');

describe('LandmarkAnnotation', () => {
    it('should be a class', () => {
        expect(LandmarkAnnotation).to.be.a('function');
    });

    it('should construct empty', () => {
        const la = new LandmarkAnnotation();
        assertDefault(la);
    });

    describe('viewmodel', () => {
        it('should return a viewmodel for a web component', () => {
            const la = new LandmarkAnnotation();
            const actualVM = la.getViewmodel();

            expect(actualVM).to.deep.equal({
                landmarks: [],
                imageUrl: ``,
                distancePerPixel: 0.01,
                distanceUnit: 'mm'
            })
        });

        it('should return landmark viewmodels', () => {
            const landmarks = [
                testUtils.sampleLandmarkData()
            ];
            const la = new LandmarkAnnotation({landmarks});

            const actualLandmarkViewmodel = la.getViewmodel().landmarks[0];
            const expectedLandmarkViewmodel = new Landmark( testUtils.sampleLandmarkData() ).getViewmodel();
            expect(actualLandmarkViewmodel).to.deep.equal(expectedLandmarkViewmodel);
        });
    });

    describe('landmarks', () => {
        it('should construct Landmark classes with landmark data', () => {
            const landmarks = [{}, {}];
            const la = new LandmarkAnnotation({landmarks});
            expect(la.landmarks.length).to.be.greaterThan(0);
            la.landmarks.forEach(l => {
                expect(l).to.be.instanceOf(Landmark);
            })
        });
    });

    describe('image url', () => {
        it('should be able to have a url to an image', () => {
            const url = `${Math.random().toString(36)}.html`;
            const la = new LandmarkAnnotation({ imageUrl: url });
            expect(la.getViewmodel().imageUrl).to.equal(url);
        });
    });
});

function assertDefault(la) {
    expect(la.landmarks).to.deep.equal([]);
    expect(la.imageUrl).to.deep.equal('');
    expect(la.distancePerPixel).to.equal(0.01);
    expect(la.distanceUnit).to.equal('mm');
}