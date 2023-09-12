import { configureStore } from '@reduxjs/toolkit'
import controllerReducer from './controllerSlice.jsx'

export default configureStore({
    reducer: {
        controller: controllerReducer
    }
})