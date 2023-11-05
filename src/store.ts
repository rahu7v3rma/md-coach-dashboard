import { configureStore } from '@reduxjs/toolkit';

import clientReducer from './reducers/client';
import notificationReducer from './reducers/notification';
import userReducer from './reducers/user';

// define store options as a variable so we can export it for tests to use
const storeOptions: any = {
    reducer: {
        user: userReducer,
        client: clientReducer,
        notification: notificationReducer
    }
};

const store = configureStore(storeOptions);

export default store;

// infer the `RootState` type from the store
export type RootState = ReturnType<typeof store.getState>;

// infer the `AppDispatch` type from the store so thunk actions can return promises
export type AppDispatch = typeof store.dispatch;

export const test = {
    storeOptions
};
