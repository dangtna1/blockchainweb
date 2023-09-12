import { createSlice } from "@reduxjs/toolkit";

export const controllerSlice = createSlice({
    name: 'controller',
    initialState: {
        controllerSignals: [0, 0, 0, 0, 0, 0, 0, 0]
    },
    reducers: {
        updateSignal: (state, action) => {
            const index = action.payload[0] - 1;
            const newSignal = action.payload[1];
            state.controllerSignals[index] = newSignal;
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateSignal } = controllerSlice.actions

export default controllerSlice.reducer