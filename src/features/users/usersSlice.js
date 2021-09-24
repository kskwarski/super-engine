import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../api/client';

const initialState = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await client.get('/fakeApi/users')
    return response.data
})

export const selectAllUsers = state => state.users

export const selectUserById = (state, userId) => state.users.find(user => user.id === userId)

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(bulder) {
        bulder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

export default usersSlice.reducer;