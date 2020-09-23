import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

let teamMemberId = 0;

const slice = createSlice({
    name: "teamMembers",
    initialState: [],
    reducers: {
        addMember: (members, action) => {
            members.push({
                id: ++teamMemberId,
                name: action.payload.name,
            });
        },
    }
});


export const { addMember } = slice.actions;
export default slice.reducer;