const actions = require('./actions/actions');

const INITIAL_STATE = {
    imageUrl: Math.random() > .4 ? `http://www.placebacon.net/4000/3000` : `http://www.placekitten.com/4000/3000`
};

function reducer(state = INITIAL_STATE, action) {
    const fn = actions.ACTIONS[action.type];
    return !fn ? state : fn(state, action.args);
}

module.exports = reducer;