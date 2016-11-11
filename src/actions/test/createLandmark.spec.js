const expect = require( 'chai' ).expect;
const deepFreeze = require( 'deep-freeze' );
const createLandmark = require( '../createLandmark' );
const testUtils = require('../../utils/testUtils');

describe( 'createLandmark Action', () => {
    it( 'should create a new landmark with an id and add it to the state', () => {
        const state = {
            imageUrl: `http://www.placebacon.net/4000/3000`,
            landmarks: []
        };

        deepFreeze( state );

        const actualState = createLandmark( state );

        expect( actualState.imageUrl ).to.equal( `http://www.placebacon.net/4000/3000` );
        expect( actualState.landmarks ).to.have.lengthOf(1);
        expect( actualState.landmarks[0].id ).to.be.a('string');
    } );

    it( 'should add a landmarks array if there is none', () => {
        const state = {
            imageUrl: `http://www.placebacon.net/4000/3000`
        };

        deepFreeze( state );

        const actualState = createLandmark( state );

        expect(actualState.landmarks).to.have.lengthOf(1);
    } );

    it( 'should add the landmark to the end of the existing list', () => {
        const state = {
            imageUrl: `http://www.placebacon.net/4000/3000`,
            landmarks: [
                {
                    id: '1',
                    point: [25, 50]
                },
                {
                    id: '2',
                    title: 'Foobar'
                },
                {
                    id: '3'
                }
            ]
        };

        deepFreeze( state );

        const actualState = createLandmark( state );

        expect( actualState.landmarks ).to.have.lengthOf(4);
        expect( actualState.landmarks[3].id ).to.be.a('string');
    } );
} );