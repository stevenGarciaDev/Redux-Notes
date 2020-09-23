// import { createStore } from 'redux';
// import reducer from './reducer';
// import reducer from './store/bugs';
// import { devToolsEnhancer } from 'redux-devtools-extension';

// export default createStore(
//     reducer, 
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// export default createStore(
//     reducer, 
//     devToolsEnhancer({ trace: true })
// );

// export default function configureStore() {
//     const store = createStore(
//         reducer, 
//         devToolsEnhancer({ trace: true })
//     );
//     return store;
// }

// ------------------
// Redux Toolkit
// wraps the creatStore function of Redux 

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import reducer from './store/bugs';
// import reducer from './store/projects';
import reducer from './store/reducer';
import logger from './store/middleware/logger';
// import func from './store/middleware/func';
import errorToast from './store/middleware/errorToast';
import api from './store/middleware/api';

export default function() {
    return configureStore({
         reducer,
         middleware: [
            ...getDefaultMiddleware(),
            logger('console'),
            // func,
            errorToast,
            api
        ]
    });
}

/*
Below is how to apply middleware without Redux toolkit.

import { createStore, applyMiddleware } from 'redux';

export default const store = createStore(reducer, applyMiddleware(logger));

applyMiddleware is a store enhancer
*/