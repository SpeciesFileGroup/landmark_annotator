const expect = require('chai').expect;
const Landmark = require('../Landmark');

const DefaultColor = `#00FF00`;
const DefaultTitle = 'Untitled';

describe('Landmark', () => {
    it('should be a class', () => {
        expect(Landmark).to.be.a('function');
    });

    it('should have defaults', () => {
        const l = new Landmark();
        assertDefaults(l);
    });

    describe('viewmodel', () => {
        it('should be able to return a viewmodel for a web component', () => {
            const l = new Landmark();
            const actualViewmodel = l.getViewmodel();
            expect(actualViewmodel).to.deep.equal({
                color: DefaultColor,
                points: [],
                title: DefaultTitle
            })
        });
    });

    describe('points', () => {
        it('should be able to have points', () => {
            const points = [
                [100, 200],
                [700, 500],
                [500, 230]
            ];
            const l = new Landmark({ points });
            expect(l.getViewmodel().points).to.deep.equal([
                {
                    x: 100,
                    y: 200
                },
                {
                    x: 700,
                    y: 500
                },
                {
                    x: 500,
                    y: 230
                }
            ]);
        });
    });

    describe('color', () => {
        it('should be able to have color', () => {
            const color = '#234567';
            const l = new Landmark({ color });
            expect(l.getViewmodel().color).to.equal(color);
        });
    });

    describe('title', () => {
        it('should be able to have a title', () => {
            const title = 'FOO BAR BAZZZZZ';
            const l = new Landmark({ title });
            expect(l.getViewmodel().title).to.equal(title);
        });
    });
});

function assertDefaults(landmark) {
    expect(landmark.color).to.equal(DefaultColor);
    expect(landmark.points).to.deep.equal([]);
    expect(landmark.title).to.equal(DefaultTitle);
}