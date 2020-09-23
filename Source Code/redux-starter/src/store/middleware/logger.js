// log every action that is dispatched 
const logger = param => store => next => action => {
    console.log("Logging", param);
    return next(action);
};

export default logger;
// signature is a curried version 
// for converting a function with N parameters 
// a bunch of functions, each with a single parameter 
// We use it when each function should have a single parameter 
// to compose them together.
// All we need to do is replace the commas with arrows.

// S.N.A.
// could instead use destructing in place of store parameter too