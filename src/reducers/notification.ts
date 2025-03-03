import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice
} from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import * as api from '../services/api';
import { RootState } from 'src/store';
import { NotificationListResponse } from 'src/types/notification';

interface NotificationState {
    loading: boolean;
    notifications: NotificationListResponse;
    unreadCount: number;
}

const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState({
    loading: false,
    notifications: {
        list: [],
        hasPrevious: false,
        hasNext: false,
        totalCount: 0,
        nextPageNumber: 1,
        previousPageNumber: 0
    },
    unreadCount: 0
} as NotificationState);

export const getNotification = createAsyncThunk(
    'user/notifications',
    async (
        options: {
            page: number;
            limit: number;
        },
        { rejectWithValue }
    ) => {
        try {
            return await api.getNotifction(options.page, options.limit);
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const readNotification = createAsyncThunk(
    'user/readNotifications',
    async (
        options: {
            id: number;
        },
        { rejectWithValue }
    ) => {
        try {
            return await api.readNotification(options.id);
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getNotification.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getNotification.fulfilled, (state, action) => {
            state.loading = false;
            if (state.notifications.hasPrevious) {
                const oldData = state.notifications.list;
                action.payload.list = [...oldData, ...action.payload.list];
            }
            state.notifications.list = action.payload.list;
            state.unreadCount = action.payload.total_unread;
            state.loading = false;
        });
        builder.addCase(getNotification.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(readNotification.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(readNotification.fulfilled, (state, action) => {
            state.loading = false;
            state.notifications.list = state.notifications.list.map((item) => {
                if (item.id === action.meta.arg.id) {
                    item.read_flag = true;
                    state.unreadCount = state.unreadCount - 1;
                }
                return item;
            });
        });
        builder.addCase(readNotification.rejected, (state) => {
            state.loading = false;
        });
    }
});

export default notificationSlice.reducer;

interface NotificationSelectorsType {
    loading: boolean;
    notifications: NotificationListResponse;
    unreadCount: number;
}

export const NotificationSelectors = (): NotificationSelectorsType => {
    const loading = useSelector(
        (state: RootState) => state.notification.loading
    );

    const notifications = useSelector(
        (state: RootState) => state.notification.notifications
    );

    const unreadCount = useSelector(
        (state: RootState) => state.notification.unreadCount
    );
    return {
        loading,
        notifications,
        unreadCount
    };
};
