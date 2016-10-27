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
                {
                    points: [
                        [500, 500]
                    ],
                    title: 'Foo',
                    color: `#339988`
                }
            ];
            const la = new LandmarkAnnotation({landmarks});

            const actualLandmarks = la.getViewmodel().landmarks;
            expect(actualLandmarks[0]).to.deep.equal({
                points: [
                    {
                        x: 500,
                        y: 500
                    }
                ],
                title: 'Foo',
                color: '#339988'
            });
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
});

function assertDefault(la) {
    expect(la.landmarks).to.deep.equal([]);
    expect(la.imageUrl).to.deep.equal('');
    expect(la.distancePerPixel).to.equal(0.01);
    expect(la.distanceUnit).to.equal('mm');
}