const actions = require('./actions/actions');

const INITIAL_STATE = {
    landmarkAnnotation: {
        imageUrl: `http://www.placebacon.net/4000/3000`
    }
};

function reducer(state = INITIAL_STATE, action) {
    const fn = actions.ACTIONS[action.type];
    return !fn ? state : fn(state, action.args);
}

module.exports = reducer;