import { createSlice } from '@reduxjs/toolkit';

type AuthState = {
    user: { id: string; name: string; email: string } | null;
    isAuthenticated: boolean;
};

const storedUser = localStorage.getItem('user');

const initialState: AuthState = {
    user: storedUser ? JSON.parse(storedUser) : null,
    isAuthenticated: false,
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('user');
        },
        setUser: (state, { payload }) => {
            state.user = payload;
            localStorage.setItem('user', JSON.stringify(payload));
        },
    },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
