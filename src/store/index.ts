import {configureStore} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { googleApi } from './google/google.api'

export const store = configureStore({
    reducer: {
        [googleApi.reducerPath]: googleApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(googleApi.middleware)
})