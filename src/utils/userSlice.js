import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        setUser : (user, action) => {
            return action.payload;
        },
        removeUser : (user, action) => {
            return null;
        }
    }
});

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;