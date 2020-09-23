import configureStore from './configureStore';
// import * as from './actionTypes';
// import { bugAdded, bugResolved } from './;
// import store from './custom/customStore';
import { bugAdded, bugResolved, bugAssignedToUser, selectUnresolvedBugs, selectBugsByUser, resolveBug, loadBugs, addBug, assignBugToUser } from './store/bugs';
import { projectAdded } from './store/projects';
import { addMember } from './store/teamMembers';
import * as actions from './store/api';;

const store = configureStore();

// store.dispatch({
//     type: "apiCallBegan",
//     payload: {
//         url: "/bugs",
//         method: "get",
//         onSuccess: "bugsReceived",
//         onError: "apiRequestFailed"
//     }
// });

// store.dispatch(actions.apiCallBegan({
//     url: "/bugs",
//     method: "get",
//     onSuccess: "bugs/bugsReceived"
// }));

store.dispatch(loadBugs());

setTimeout(() => store.dispatch(loadBugs(), 2000));

store.dispatch(addBug({
    description: "BUG!"
}));

store.dispatch(addMember({
    name: "Steven"
}));

store.dispatch(resolveBug(2));

store.dispatch(assignBugToUser(1, 1));


// Give ability to dispatch functions with middleware.
// store.dispatch((dispatch, getState) => {
//     dispatch({ type: 'bugsReceived', bugs: [1, 2, 3]});
//     console.log(getState());
// });

// store.dispatch({
//     type: "error",
//     payload: { message: "An error occurred." }
// });

// console.log(store);

// This function gets called every time the state of the store changes.
// To be utilized in the UI layer.
// So UI components subscribe to the store so that they can be notified for changes.
// const unsubscribe = store.subscribe(() => {
//     console.log("Store changed!", store.getState());
// });

// store.dispatch(projectAdded("Redux Project"));

// store.dispatch(bugAdded({ description: "Bug1" }));
// store.dispatch(bugAdded({ description: "Bug2" }));
// store.dispatch(bugAdded({ description: "Bug3" }));

// // store.dispatch(bugResolved({ id: 1 }));

// store.dispatch(addMember({
//     name: "Steven"
// }));

// store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1}))

// const unresolvedBugs = selectUnresolvedBugs(store.getState());
// console.log(unresolvedBugs);

// For us to pass arguments
// const bugs = selectBugsByUser(1)(store.getState());
// console.log(bugs);
