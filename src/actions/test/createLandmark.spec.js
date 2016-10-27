const expect = require('chai').expect;
const deepFreeze = require('deep-freeze');
const createLandmark = require('../createLandmark');

describe('createLandmark Action', () => {
    it('should create a new landmark and add it to the state', () => {
        const state = {
            landmarkAnnotation: {
                landmarks: []
            }
        };

        deepFreeze(state);

        const actualState = createLandmark(state);

        const expectedState = {
            landmarkAnnotation: {
                landmarks: [
                    {}
                ]
            }
        };

        expect(actualState).to.deep.equal(expectedState);
    });

    it('should add a landmarks array if there is none', () => {
        const state = {
            landmarkAnnotation: {}
        };

        deepFreeze(state);

        const actualState = createLandmark(state);

        const expectedState = {
            landmarkAnnotation: {
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