import { configureStore } from '@reduxjs/toolkit'
import controllerReducer from './controllerSlice'
import careHistoryReducer from './careHistorySlice'

export default configureStore({
    reducer: {
        controller: controllerReducer,
        careHistory: careHistoryReducer
    }
})