import { createSlice } from '@reduxjs/toolkit'

export const sensorHistorySlice = createSlice({
    name: 'sensorHistory',
    initialState: {
        sensorsCount: 0,
        sensorsData: [],
    },
    reducers: {
        pushSensorData: (state, action) => {
            state.sensorsCount += 1
            state.sensorsData.push(action.payload)
        },

        resetAllStates: (state) => {
            state.sensorsCount = 0
            state.sensorsData = []
        },
    },
})

// Action creators are generated for each case reducer function
export const { pushSensorData, resetAllStates } = sensorHistorySlice.actions

export default sensorHistorySlice.reducer
