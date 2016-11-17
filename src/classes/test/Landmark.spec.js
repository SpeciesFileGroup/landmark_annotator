const expect = require('chai').expect;
const Landmark = require('../Landmark');

const DefaultColor = `#00FF00`;
const DefaultTitle = 'Untitled';

describe('Landmark', () => {
    it('should be a class', () => {
        expect(Landmark).to.be.a('function');
    });

    it('should have internal defaults', () => {
        const l = new Landmark();
        assertDefaults(l);
    });

    describe('viewmodel', () => {
        it('should be able to return a viewmodel for a web component', () => {
            const l = new Landmark();
            const actualViewmodel = l.getViewmodel();
            expect(actualViewmodel).to.deep.equal({
                color: DefaultColor,
                point: null,
                title: DefaultTitle,
                id: null
            })
        });
    });

    describe('points', () => {
        it('should be able to have a point', () => {
            const point = [100, 200];
            const l = new Landmark({ point });
            expect(l.getViewmodel().point).to.deep.equal(point);
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

    describe('id', () => {
        it('should be able to have an id', () => {
            const id = "1";
            const l = new Landmark({ id });
            expect(l.getViewmodel().id).to.equal(id);
        });
    });

    describe('creating points from location', () => {
        const boundingRect = {
            top: 100,
            left: 100,
            width: 100,
            height: 100
        };

        const pageX = 150;
        const pageY = 150;

        it('should be able to find the x and y on the image from event info and bounding rects', () => {
            expect(Landmark.getPointFromClick(pageX, pageY, boundingRect)).to.deep.equal([50, 50]);
        });

        it('should return null if the click was outside the rect', () => {
            expect(Landmark.getPointFromClick(99, 99, boundingRect)).to.be.null;
            expect(Landmark.getPointFromClick(201, 201, boundingRect)).to.be.null;
            expect(Landmark.getPointFromClick(101, 999, boundingRect)).to.be.null;
            expect(Landmark.getPointFromClick(201, 150, boundingRect)).to.be.null;
        });
    });
});

function assertDefaults(landmark) {
    expect(landmark.color).to.equal(DefaultColor);
    expect(landmark.point).to.deep.equal([]);
    expect(landmark.title).to.equal(DefaultTitle);
}