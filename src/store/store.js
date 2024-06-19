import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice"
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userApi } from "./reducers/apiSlice";
const persistConfig = {
    key: 'root',
    storage,
};
const rootReducer = {
    user: persistReducer(persistConfig, userSlice)
}
const store = configureStore({
    reducer: {
        rootReducer,
        [userApi.reducerPath]: userApi.reducer

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActionPaths: ['payload.photo'],
            ignoredPaths: ['user.personalInfo.photo'],
            ignoredActions: [
                FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
            ]
        },
    })
},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


const persistor = persistStore(store);

export { persistor, store };