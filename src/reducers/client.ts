import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice
} from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import * as api from '../services/api';
import { RootState } from '../store';
import { ClientProfiles } from 'src/types/client';
import { logBooks } from 'src/types/log';
import { UserClient } from 'src/types/user';

const clientAdapter = createEntityAdapter();

interface ClientState {
    loading: boolean;
    clients: {
        list: Array<UserClient>;
        searchInput: string;
        hasPrevious: boolean;
        hasNext: boolean;
        totalCount: number;
        nextPageNumber: number;
        previousPageNumber: number;
    };
    profiles: ClientProfiles;
    logBook: logBooks;
}

const initialState = clientAdapter.getInitialState({
    loading: false,
    profiles: {},
    logBook: {},
    clients: {
        list: [],
        searchInput: '',
        hasPrevious: false,
        hasNext: false,
        totalCount: 0,
        nextPageNumber: 1,
        previousPageNumber: 0
    }
} as ClientState);

export const getUserInfo = createAsyncThunk(
    'client/getUserInfo',
    async (id: string, { rejectWithValue }) => {
        try {
            const userInfo = await api.getUserInfo(id);
            return {
                ...userInfo,
                id
            };
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const getClients = createAsyncThunk(
    'client/customers',
    async (
        { page, limit, search }: Record<string, string | number>,
        { rejectWithValue }
    ) => {
        try {
            return await api.getClients(
                page as number,
                limit as number,
                search as string
            );
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const getLogBook = createAsyncThunk(
    'user/getLogBook',
    async (
        options: {
            page: number;
            limit: number;
            user_id: string;
        },
        { rejectWithValue }
    ) => {
        try {
            return await api.getLogBook(
                options.page,
                options.limit,
                options.user_id
            );
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const onSearchChange = createAsyncThunk(
    'onSearchChange',
    async (search: string) => {
        return search;
    }
);

const clientSlice: any = createSlice({
    name: 'client',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLogBook.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getLogBook.fulfilled, (state, action) => {
            state.loading = false;
            const userID = action.meta.arg.user_id;
            if (action.payload.has_previous) {
                const old_list = state.logBook[userID].list;
                const appended_list = [...old_list, ...action.payload.list];
                action.payload.list = appended_list;
                state.logBook[userID] = action.payload;
            } else {
                state.logBook[userID] = action.payload;
            }
        });
        builder.addCase(getLogBook.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(getUserInfo.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            state.loading = false;

            const profiles: ClientProfiles = { ...state.profiles };
            profiles[action.payload.id] = action.payload;

            state.profiles = profiles;
        });
        builder.addCase(getUserInfo.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(getClients.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getClients.fulfilled, (state, action) => {
            state.loading = false;
            state.clients.hasPrevious = action.payload.has_previous;
            state.clients.hasNext = action.payload.has_next;
            state.clients.nextPageNumber = action.payload.next_page_number;
            state.clients.totalCount = action.payload.count;
            state.clients.list = action.payload.list;
        });
        builder.addCase(getClients.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(onSearchChange.fulfilled, (state, action) => {
            state.clients.searchInput = action.payload;
        });
    }
});

export default clientSlice.reducer;

interface ClientSelectorsType {
    loading: boolean;
    logBook: any;
    profiles: ClientProfiles;
    clients: Array<UserClient>;
    searchInput: string;
    hasPrevious: boolean;
    hasNext: boolean;
    totalCount: number;
    nextPageNumber: number;
    previousPageNumber: number;
}

export const ClientSelectors = (): ClientSelectorsType => {
    const loading = useSelector((state: RootState) => state.client.loading);
    const clients = useSelector(
        (state: RootState) => state.client.clients.list
    );
    const hasPrevious = useSelector(
        (state: RootState) => state.client.clients.hasPrevious
    );
    const hasNext = useSelector(
        (state: RootState) => state.client.clients.hasNext
    );
    const totalCount = useSelector(
        (state: RootState) => state.client.clients.totalCount
    );
    const searchInput = useSelector(
        (state: RootState) => state.client.clients.searchInput
    );
    const nextPageNumber = useSelector(
        (state: RootState) => state.client.clients.nextPageNumber
    );
    const previousPageNumber = useSelector(
        (state: RootState) => state.client.clients.previousPageNumber
    );

    const profiles = useSelector((state: RootState) => state.client.profiles);

    const logBook = useSelector((state: RootState) => state.client.logBook);

    return {
        loading,
        logBook,
        profiles,
        clients,
        searchInput,
        hasPrevious,
        hasNext,
        totalCount,
        nextPageNumber,
        previousPageNumber
    };
};
