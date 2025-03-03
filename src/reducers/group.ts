import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice
} from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import * as api from '../services/api';
import { RootState } from 'src/store';
import { UserGroup } from 'src/types/user';

interface GroupState {
    loading: boolean;
    groups: UserGroup[];
}

const groupAdapter = createEntityAdapter();

const initialState = groupAdapter.getInitialState({
    loading: false
} as GroupState);

export const fetchGroupsList = createAsyncThunk(
    'chat/groups',
    async (options: {}, { rejectWithValue }) => {
        try {
            return await api.getGroupsList();
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchGroupsList.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchGroupsList.fulfilled, (state, action) => {
            state.loading = false;
            state.groups = action.payload;
        });
        builder.addCase(fetchGroupsList.rejected, (state) => {
            state.loading = false;
        });
    }
});

export default groupSlice.reducer;

interface GroupSelectorsType {
    loading: boolean;
    groups: UserGroup[];
}

export const GroupSelectors = (): GroupSelectorsType => {
    const loading = useSelector((state: RootState) => state.group.loading);
    const groups = useSelector((state: RootState) => state.group.groups);
    return {
        loading,
        groups
    };
};
