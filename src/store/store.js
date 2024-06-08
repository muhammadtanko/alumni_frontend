import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice"

const store = configureStore({
    reducer: {
        user: userSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActionPaths: ['payload.photo'],
            ignoredPaths: ['user.personalInfo.photo'],
        },
    })
},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())



export default store;