import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice
} from '@reduxjs/toolkit';
import moment from 'moment';
import { SortOrder } from 'react-data-table-component';
import { useSelector } from 'react-redux';

import * as api from '../services/api';
import { RootState } from '../store';
import { Colors } from '../utils/colors';
import { ClientProfiles } from 'src/types/client';
import { logBooks } from 'src/types/log';
import { Note, Notes } from 'src/types/note';
import { UserClient, UserGroup } from 'src/types/user';

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
        sortBy: number;
        order: SortOrder;
    };
    profiles: ClientProfiles;
    logBook: logBooks;
    notes: Notes;
    groups: {
        list: Array<UserGroup>;
        searchInput: string;
        hasPrevious: boolean;
        hasNext: boolean;
        totalCount: number;
        nextPageNumber: number;
        previousPageNumber: number;
        sortBy: number;
        order: SortOrder;
    };
    analytics: any;
}

const initialState = clientAdapter.getInitialState({
    loading: false,
    profiles: {},
    logBook: {},
    notes: {},
    clients: {
        list: [],
        searchInput: '',
        hasPrevious: false,
        hasNext: false,
        totalCount: 0,
        nextPageNumber: 1,
        previousPageNumber: 0,
        sortBy: 0,
        order: 'asc'
    },
    groups: {
        list: [],
        searchInput: '',
        hasPrevious: false,
        hasNext: false,
        totalCount: 4,
        nextPageNumber: 1,
        previousPageNumber: 0,
        sortBy: 0,
        order: 'asc'
    },
    analytics: []
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

export const getUserAnalytics = createAsyncThunk(
    'client/getUserAnalytics',
    async (
        { id, startDate, endDate }: Record<string, string | number>,
        { rejectWithValue }
    ) => {
        try {
            return await api.getUserAnalytics(
                id as string | number,
                startDate as string,
                endDate as string
            );
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const getClients = createAsyncThunk(
    'client/customers',
    async (
        { page, limit, search, sortBy, order }: Record<string, string | number>,
        { rejectWithValue }
    ) => {
        try {
            return await api.getClients(
                page as number,
                limit as number,
                search as string,
                sortBy as number,
                order as SortOrder
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
            category: string;
        },
        { rejectWithValue }
    ) => {
        try {
            return await api.getLogBook(
                options.page,
                options.limit,
                options.user_id,
                options.category
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

export const getNotes = createAsyncThunk(
    'client/getNotes',
    async (options: { page: number; limit: number; clientId: string }) => {
        return await api.getNotes(
            options.page,
            options.limit,
            options.clientId
        );
    }
);

export const addNote = createAsyncThunk(
    'client/addNote',
    async (options: {
        id: number;
        coach_id?: string;
        client_id: string;
        content: string;
        created_at: Date;
    }): Promise<Note> => {
        return await api.addNote(+options.client_id, options.content);
    }
);

export const editNote = createAsyncThunk(
    'client/editNote',
    async (options: {
        id: number;
        coach_id?: string;
        client_id: string;
        content: string;
        created_at: Date;
    }): Promise<Note> => {
        return await api.updateNote(
            options.id,
            +options.client_id,
            options.content
        );
    }
);

export const deleteNote = createAsyncThunk(
    'client/deleteNote',
    async (options: { id: number; clientId: string }) => {
        return await api.deleteNote(options.id);
    }
);

const clientSlice: any = createSlice({
    name: 'client',
    initialState,
    reducers: {
        sortOrder: (state, action) => {
            state.clients.sortBy = action.payload.sortBy;
            state.clients.order = action.payload.order;
        },
        sortGroupOrder: (state, action) => {
            state.groups.sortBy = action.payload.sortBy;
            state.groups.order = action.payload.order;
        }
    },
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
            state.clients.sortBy = action.meta.arg.sortBy as number;
            state.clients.order = action.meta.arg.order as SortOrder;
        });
        builder.addCase(getClients.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(onSearchChange.fulfilled, (state, action) => {
            state.clients.searchInput = action.payload;
        });
        builder.addCase(getNotes.fulfilled, (state, action) => {
            const userID = action.meta.arg.clientId;
            if (action.payload.has_previous) {
                const old_list = state.notes[userID].list;
                const appended_list = [...old_list, ...action.payload.list];
                action.payload.list = appended_list;
                state.notes[userID] = action.payload;
            } else {
                state.notes[userID] = action.payload;
            }
        });
        builder.addCase(addNote.fulfilled, (state, action) => {
            state.notes[action.meta.arg.client_id].list.push(action.payload);
        });
        builder.addCase(editNote.fulfilled, (state, action) => {
            let previous_notes = {
                ...state.notes[action.meta.arg.client_id]
            };
            let edited_note = previous_notes.list.filter(
                (note) => note.id === action.meta.arg.id
            );
            if (edited_note.length) {
                edited_note[0].content = action.payload.content;
            }
            state.notes[action.meta.arg.client_id] = previous_notes;
        });
        builder.addCase(deleteNote.fulfilled, (state, action) => {
            let previous_notes = {
                ...state.notes[action.meta.arg.clientId]
            };
            previous_notes.list = previous_notes.list.filter(
                (note) => note.id !== action.meta.arg.id
            );
            state.notes[action.meta.arg.clientId] = previous_notes;
        });
        builder.addCase(getUserAnalytics.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserAnalytics.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(getUserAnalytics.fulfilled, (state, action: any) => {
            const UserFastData: any =
                Object.keys(action.payload.UserFast).map((key: string) => ({
                    x: moment(key).format('DD/MM/YY'),
                    y:
                        action.payload.UserFast[key]?.length > 0
                            ? action.payload.UserFast[key][0]
                                  ?.duration_minutes ?? 0
                            : 0,
                    unit: 'min'
                })) ?? [];
            const UserGlucoseData: any =
                Object.keys(action.payload.UserGlucose).map((key: string) => ({
                    x: moment(key).format('DD/MM/YY'),
                    y:
                        action.payload.UserGlucose[key]?.length > 0
                            ? action.payload.UserGlucose[key][0]?.amount ?? 0
                            : 0,
                    unit:
                        action.payload.UserGlucose[key]?.length > 0
                            ? action.payload.UserGlucose[key][0]?.unit ?? ''
                            : ''
                })) ?? [];
            const UserWeightData: any =
                Object.keys(action.payload.UserWeight).map((key: string) => ({
                    x: moment(key).format('DD/MM/YY'),
                    y:
                        action.payload.UserWeight[key]?.length > 0
                            ? Math.round(
                                  action.payload.UserWeight[key][0]?.amount
                              ) ?? 0
                            : 0,
                    unit:
                        action.payload.UserWeight[key]?.length > 0
                            ? action.payload.UserWeight[key][0]?.unit ?? ''
                            : ''
                })) ?? [];
            const UserInsulinData: any =
                Object.keys(action.payload.UserInsulin).map((key: string) => ({
                    x: moment(key).format('DD/MM/YY'),
                    y:
                        action.payload.UserInsulin[key]?.length > 0
                            ? action.payload.UserInsulin[key][0]?.units ?? 0
                            : 0,
                    unit:
                        action.payload.UserInsulin[key]?.length > 0
                            ? action.payload.UserInsulin[key][0]
                                  ?.injection_type ?? ''
                            : ''
                })) ?? [];

            state.analytics = [
                {
                    title: 'Glucose',
                    color: Colors.extra.darkTerraCotta,
                    chart: {
                        type: 'line' as 'line',
                        data: UserGlucoseData
                    }
                },
                {
                    title: 'Weight (kg)',
                    color: Colors.extra.skyBlue2,
                    chart: {
                        type: 'line' as 'line',
                        data: UserWeightData
                    }
                },
                {
                    title: 'Fasting',
                    color: Colors.extra.lightPink,
                    chart: {
                        type: 'bar' as 'bar',
                        data: UserFastData
                    }
                },
                {
                    title: 'Insulin',
                    color: Colors.extra.lightGreen2,
                    chart: {
                        type: 'bar' as 'bar',
                        data: UserInsulinData
                    }
                }
            ];
        });
    }
});

export default clientSlice.reducer;

interface ClientSelectorsType {
    loading: boolean;
    logBook: any;
    notes: Notes;
    profiles: ClientProfiles;
    clients: Array<UserClient>;
    searchInput: string;
    hasPrevious: boolean;
    hasNext: boolean;
    totalCount: number;
    totalGroupCount: number;
    nextPageNumber: number;
    previousPageNumber: number;
    sortBy: number;
    order: string;
    groups: Array<UserGroup>;
    groupSortBy: number;
    groupOrder: string;
    analytics: any;
}

export const { sortOrder, sortGroupOrder } = clientSlice.actions;

export const ClientSelectors = (): ClientSelectorsType => {
    const loading = useSelector((state: RootState) => state.client.loading);
    const clients = useSelector(
        (state: RootState) => state.client.clients.list
    );
    const groups = useSelector((state: RootState) => state.client.groups.list);
    const hasPrevious = useSelector(
        (state: RootState) => state.client.clients.hasPrevious
    );
    const hasNext = useSelector(
        (state: RootState) => state.client.clients.hasNext
    );
    const totalGroupCount = useSelector(
        (state: RootState) => state.client.groups.totalCount
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

    const sortBy = useSelector(
        (state: RootState) => state.client.clients.sortBy
    );

    const order = useSelector((state: RootState) => state.client.clients.order);

    const groupSortBy = useSelector(
        (state: RootState) => state.client.groups.sortBy
    );

    const groupOrder = useSelector(
        (state: RootState) => state.client.groups.order
    );

    const profiles = useSelector((state: RootState) => state.client.profiles);

    const logBook = useSelector((state: RootState) => state.client.logBook);

    const notes = useSelector((state: RootState) => state.client.notes);

    const analytics = useSelector((state: RootState) => state.client.analytics);

    return {
        loading,
        logBook,
        notes,
        profiles,
        clients,
        searchInput,
        hasPrevious,
        hasNext,
        totalCount,
        nextPageNumber,
        previousPageNumber,
        sortBy,
        order,
        groups,
        totalGroupCount,
        groupSortBy,
        groupOrder,
        analytics
    };
};
