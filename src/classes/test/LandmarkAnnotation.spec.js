const expect = require('chai').expect;
const LandmarkAnnotation = require('../LandmarkAnnotation');

describe('LandmarkAnnotation', () => {
    it('should be a class', () => {
        expect(LandmarkAnnotation).to.be.a('function');
    });
});