import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { client } from '../../api/client';

const userAdapter = createEntityAdapter()

const initialState = userAdapter.getInitialState()

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await client.get('/fakeApi/users')
    return response.data
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(bulder) {
        bulder.addCase(fetchUsers.fulfilled, userAdapter.setAll)
    }
})

export default usersSlice.reducer;

export const { selectAll: selectAllUsers, selectById: selectUserById } = userAdapter.getSelectors(state => state.users)