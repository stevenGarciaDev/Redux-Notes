// import { addBug } from '../bugs';
// import { apiCallBegan } from '../api';

// describe("bugsSlice", () => {
//     describe("action creators", () => {
//         it("addBug", () => {
//             const bug = { description: 'a' };

//             const result = addBug(bug);

//             const expected = {
//                 type: apiCallBegan.type,
//                 payload: {
//                     url: '/bugs',
//                     method: 'post',
//                     data: bug,
//                     onSuccess: 'bugs/bugAdded'
//                 }
//             }

//             expect(result).toEqual(expected);
//         });
//     });
// });

// now the proper way, the social tests 

import axios from 'axios';
import { addBug, resolveBug } from '../bugs';
import MockAdapter from 'axios-mock-adapter';
import configureStore from '../../configureStore';

describe("bugsSlice", () => {
    let fakeAxios;
    let store;

    beforeEach(() => {
        fakeAxios = new MockAdapter(axios);
        store = configureStore();
    });

    const bugsSlice = () => store.getState().entities.bugs;

    it("should add the bug to the store if it's saved to the server", async () => {
        // Arrange
        const bug = { description: 'a' };
        const savedBug = { ...bug, id: 1 };
        fakeAxios.onPost('/bugs').reply(200, savedBug);

        // Act 
        await store.dispatch(addBug(bug));

        // Assert
        //expect(store.getState().entities.bugs.list).toHaveLength(1);
        expect(bugsSlice().list).toContainEqual(savedBug);
    });

    it("should not add the bug to the store if it's not saved to the server", async () => {
        // Arrange
        const bug = { description: 'a' };
        fakeAxios.onPost('/bugs').reply(500);

        // Act 
        await store.dispatch(addBug(bug));

        // Assert
        //expect(store.getState().entities.bugs.list).toHaveLength(1);
        expect(bugsSlice().list).toHaveLength(0);
    });

    it("should resolve a bug when saved to the server", async () => {
        // have a bug saved 
        const bug = { description: 'a' };
        const savedBug = { ...bug, id: 1 };
        const expected = { ...savedBug, resolved: true };
        fakeAxios.onPost('/bugs').reply(200, savedBug);
        fakeAxios.onPatch('/bugs/1').reply(200, expected);

        await store.dispatch(addBug(bug));
        await store.dispatch(resolveBug(1));

        const resolvedBug = bugsSlice().list[0];
        expect(resolvedBug.resolved).toBe(true);     
    });

    it("should not resolve a bug if not saved to the server", async () => {
        // have a bug saved 
        const bug = { description: 'a' };
        const savedBug = { ...bug, id: 1 };
        const expected = { ...savedBug, resolved: true };
        fakeAxios.onPost('/bugs').reply(200, savedBug);
        fakeAxios.onPatch('/bugs/1').reply(500);

        await store.dispatch(addBug(bug));
        await store.dispatch(resolveBug(1));

        const resolvedBug = bugsSlice().list[0];
        expect(resolvedBug.resolved).not.toBe(true);     
    });
});