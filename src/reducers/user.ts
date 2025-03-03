import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice
} from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import * as api from '../services/api';
import { RootState } from '../store';
import { UserChatProfile, UserProfile } from '../types/user';
import { resetAuthToken } from 'src/services/auth';

const userAdapter = createEntityAdapter();

interface UserState {
    loading: boolean;
    userProfile: UserProfile | null;
    chatProfile: UserChatProfile | null;
    isSideBarOpen: boolean;
}

const initialState = userAdapter.getInitialState({
    loading: false,
    userProfile: null,
    chatProfile: null,
    isSideBarOpen: false
} as UserState);

/**
 * Login api - Use promise to get the result of login, since no need to set the login result/error in global state
 */
export const login = createAsyncThunk(
    'user/login',
    async (
        options: { email: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            return await api.login(options.email, options.password);
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

/**
 * Reset password api - Use promise to get the result of reset password, since no need to set the reset password result/error in global state
 */
export const resetPassword = createAsyncThunk(
    'user/reset/request',
    async (options: { email: string; client: string }, { rejectWithValue }) => {
        try {
            return await api.resetPassword(options.email, options.client);
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const resetPasswordVerify = createAsyncThunk(
    'user/resetPasswordVerify',
    async (options: { code: string }, { rejectWithValue }) => {
        try {
            return await api.resetPasswordVerify(options.code);
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const resetPasswordChange = createAsyncThunk(
    'user/resetPasswordChange',
    async (
        options: {
            code: string;
            password: string;
        },
        { rejectWithValue }
    ) => {
        try {
            return await api.resetPasswordChange(
                options.code,
                options.password
            );
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const refreshProfileSession = createAsyncThunk(
    'user/refreshProfileSession',
    async (_options: Record<string, string>, { rejectWithValue }) => {
        try {
            return await api.refreshProfileSession();
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const getProfile = createAsyncThunk(
    'user/getProfile',
    async (_options: {}, { rejectWithValue }) => {
        try {
            return await api.getProfile();
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async (options: { image: string }, { rejectWithValue }) => {
        try {
            return await api.updateProfile(options.image);
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'user/logoutUser',
    async (options: {}, { rejectWithValue }) => {
        try {
            return await api.logoutUser();
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleSidebar: (state, action) => {
            state.isSideBarOpen = action.payload.isOpen;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(login.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(login.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(resetPassword.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(resetPassword.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(resetPassword.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(resetPasswordVerify.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(resetPasswordVerify.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(resetPasswordVerify.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(resetPasswordChange.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(resetPasswordChange.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(resetPasswordChange.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(refreshProfileSession.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(refreshProfileSession.fulfilled, (state, action) => {
            state.loading = false;
            state.chatProfile = action.payload;
        });
        builder.addCase(refreshProfileSession.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(getProfile.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.userProfile = action.payload;
        });
        builder.addCase(getProfile.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(updateProfile.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.loading = false;

            if (state.userProfile) {
                state.userProfile.image = action.meta.arg.image;
            }
        });
        builder.addCase(updateProfile.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(logoutUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.loading = false;
            resetAuthToken();
            state = initialState;
        });
        builder.addCase(logoutUser.rejected, (state) => {
            state.loading = false;
        });
    }
});

export const { toggleSidebar } = userSlice.actions;

export default userSlice.reducer;

interface UserSelectorsType {
    loading: boolean;
    userProfile: UserProfile | null;
    chatProfile: UserChatProfile | null;
    isSideBarOpen: boolean;
}

export const UserSelectors = (): UserSelectorsType => {
    const loading = useSelector((state: RootState) => state.user.loading);

    const userProfile = useSelector(
        (state: RootState) => state.user.userProfile
    );

    const chatProfile = useSelector(
        (state: RootState) => state.user.chatProfile
    );

    const isSideBarOpen = useSelector(
        (state: RootState) => state.user.isSideBarOpen
    );

    return {
        loading,
        userProfile,
        chatProfile,
        isSideBarOpen
    };
};
