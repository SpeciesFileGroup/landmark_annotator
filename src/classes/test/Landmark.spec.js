const expect = require('chai').expect;
const Landmark = require('../Landmark');

describe('Landmark', () => {
    it('should be a class', () => {
        expect(Landmark).to.be.a('function');
    });
});