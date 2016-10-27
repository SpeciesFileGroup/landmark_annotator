const addPoint = require('../addPoint');
const expect = require('chai').expect;

describe(`addPoint Action`, () => {
    it('should be a function', () => {
        expect(addPoint).to.be.a(`function`);
    });
});