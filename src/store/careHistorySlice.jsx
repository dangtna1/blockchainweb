import { createSlice } from "@reduxjs/toolkit";

export const careHistorySlice = createSlice({
    name: 'careHistory',
    initialState: {
        controllersCount: 0,
        controllersInfo: []
    },
    reducers: {
        pushControllerInfo: (state, action) => {
            state.controllersCount += 1;
            state.controllersInfo.push(action.payload);
        },

        resetAll: (state) => {
            state.controllersCount = 0;
            state.controllersInfo = [];
        }
    }
});

// Action creators are generated for each case reducer function
export const { pushControllerInfo, resetAll } = careHistorySlice.actions

export default careHistorySlice.reducer
