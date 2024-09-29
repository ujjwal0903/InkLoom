import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
    userId: null, // Add userId to the initial state
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
            state.userId = action.payload.userId; // Store userId
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.userId = null; // Reset userId on logout
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
