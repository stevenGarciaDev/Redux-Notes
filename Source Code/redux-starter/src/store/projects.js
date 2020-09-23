import { createSlice } from '@reduxjs/toolkit';

let projectId = 0;

const slice = createSlice({
    name: 'projects',
    initialState: [],
    reducers: {
        projectAdded: (project, action) => {
            project.push({
                id: ++projectId,
                name: action.payload.name
            });
        }
    }
});

export const { projectAdded } = slice.actions;
export default slice.reducer;