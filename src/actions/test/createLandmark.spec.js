const expect = require('chai').expect;
const deepFreeze = require('deep-freeze');
const createLandmark = require('../createLandmark');

describe('createLandmark Action', () => {
    it('should create a new landmark and add it to the state', () => {
        const state = {
            landmarkAnnotation: {
                imageUrl: `http://www.placebacon.net/4000/3000`,
                landmarks: []
            }
        };

        deepFreeze(state);

        const actualState = createLandmark(state);

        const expectedState = {
            landmarkAnnotation: {
                imageUrl: `http://www.placebacon.net/4000/3000`,
                landmarks: [
                    {}
                ]
            }
        };

        expect(actualState).to.deep.equal(expectedState);
    });

    it('should add a landmarks array if there is none', () => {
        const state = {
            landmarkAnnotation: {
                imageUrl: `http://www.placebacon.net/4000/3000`
            }
        };

        deepFreeze(state);

        const actualState = createLandmark(state);

        const expectedState = {
            landmarkAnnotation: {
                imageUrl: `http://www.placebacon.net/4000/3000`,
                landmarks: [
                    {}
                ]
            }
        };

        expect(actualState).to.deep.equal(expectedState);
    });

    it('should add the landmark to the end of the existing list', () => {
        const state = {
            landmarkAnnotation: {
                imageUrl: `http://www.placebacon.net/4000/3000`,
                landmarks: [
                    {
                        points: [
                            [25, 50]
                        ]
                    },
                    {
                        title: 'Foobar'
                    },
                    {}
                ]
            }
        };

        deepFreeze(state);

        const actualState = createLandmark(state);

        const expectedState = {
            landmarkAnnotation: {
                imageUrl: `http://www.placebacon.net/4000/3000`,
                landmarks: [
                    {
                        points: [
                            [25, 50]
                        ]
                    },
                    {
                        title: 'Foobar'
                    },
                    {},
                    {}
                ]
            }
        };

        expect(actualState).to.deep.equal(expectedState);
    });
});