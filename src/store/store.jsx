import { configureStore } from '@reduxjs/toolkit'

import controllerReducer from './controllerSlice'
import careHistoryReducer from './careHistorySlice'
import sensorHistoryReducer from './sensorHistorySlice'

export default configureStore({
    reducer: {
        controller: controllerReducer,
        careHistory: careHistoryReducer,
        sensorHistory: sensorHistoryReducer,
    },
})
