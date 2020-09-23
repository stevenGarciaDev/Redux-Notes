// This middleware is already built for you.
// => Thunk 
// if redux toolkit you already get this middleware
// otherwise you need to manually install 
// npm i redux-thunk 
// then register as a middleware function
const func = ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function')
        action(dispatch, getState);
    else 
        next(action);
}

export default func;