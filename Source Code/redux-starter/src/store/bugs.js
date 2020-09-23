import { createAction, createReducer, createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';
import moment from 'moment';

const slice = createSlice({
    name: 'bugs', 
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        bugsRequested: (bugs, action) => {
            bugs.loading = true;
        },

        bugsRequestFailed: (bugs, action) => {
            bugs.loading = false;
        },
        
        bugsReceived: (bugs, action) => {
            bugs.list = action.payload;
            bugs.loading = false;
            bugs.lastFetch = Date.now();
        },

        bugAssignedToUser: (bugs, action) => {
            const { id: bugId, userId } = action.payload;
            const index = bugs.list.findIndex(bug => bug.id === bugId);
            bugs.list[index].userId = userId;
        },

        bugAdded: (bugs, action) => {
            // can write mutating code 
            bugs.list.push(action.payload);
        },

        bugResolved: (bugs, action) => {
            const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
            bugs.list[index].resolved = true;
        }
    }
});

const { bugAdded, bugResolved, bugAssignedToUser, bugsReceived, bugsRequested, bugsRequestFailed } = slice.actions;

export default slice.reducer;

// Action Creators
const url = '/bugs';

// () => {}
// To get the current state, we need to return a function.
// Can receive dispatch adn get state
export const loadBugs = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.bugs;

    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
    if (diffInMinutes < 10) return;

    // Need to explicitly dispatch

    dispatch(apiCallBegan({
        url,
        method: "get",
        onStart: bugsRequested.type,
        onSuccess: bugsReceived.type,
        onError: bugsRequestFailed.type
    }));
}


export const addBug = bug => apiCallBegan({
    url,
    method: 'post',
    data: bug,
    onSuccess: bugAdded.type
});

export const assignBugToUser = (bugId, userId) => apiCallBegan({
    url: url + '/' + bugId,
    method: 'patch',
    data: { userId },
    onSuccess: bugAssignedToUser.type
});

export const resolveBug = (bugId) => apiCallBegan({
    url: url + '/' + bugId,
    method: 'patch',
    data: { resolved: true },
    onSuccess: bugResolved.type
});

// export const loadBugs = () => apiCallBegan({
//     url,
//     method: "get",
//     onStart: bugsRequested.type,
//     onSuccess: bugsReceived.type,
//     onError: bugsRequestFailed.type
// });


// Selector is a function that takes a state and returns the computed state.
// export const selectUnresolvedBugs = state => 
//     state.entities.bugs.filter(bug => !bug.resolved);

// The output of the 1st arg, gets passed to the last argument of the list 
// the last arg is called the result function
// If the list of bugs have not changed, then the logic of the result function 
// won't be computed again.
// This selector will return the result from the cache.
export const selectUnresolvedBugs = createSelector(
    state => state.entities.bugs,
    bugs => bugs.filter(bug => !bug.resolved)
);

export const selectBugsByUser = userId => createSelector(
    state => state.entities.bugs,
    bugs => bugs.filter(bug => bug.userId === userId)
);


    
// export const bugAdded = createAction("BUG_ADDED");
// export const bugResolved = createAction("BUG_RESOLVED");
// export const bugRemoved = createAction("BUG_REMOVED");

// Reducer 

// Store is initially undefined, so we need to define an initial state.

// export default createReducer([], {
    // actions: functions 
    // event => event handler 
    // [bugAdded.type]: (bugs, action) => {
    //     // can write mutating code 
    //     bugs.push({
    //         id: ++lastId,
    //         description: action.payload.description,
    //         resolved: false
    //     });
    // },

    // [bugResolved.type]: (bugs, action) => {
    //     const index = bugs.findIndex(bug => bug.id === action.payload.id);
    //     bugs[index].resolved = true;
    // }
//});

// export default function reducer(state = [], action) {
//     switch (action.type) {
//         case bugAdded.type:
//             return [
//                 ...state,
//                 {
//                     id: ++lastId,
//                     description: action.payload.description,
//                     resolved: false
//                 }
//             ];
//         case bugRemoved.type:
//             return state.filter(bug => bug.id !== action.payload.id);
//         case bugResolved.type:
//             return state.map(bug => bug.id === action.payload.id ? {...bug, resolved: true} : bug);
//         default:
//             return state;
//     }
// }

