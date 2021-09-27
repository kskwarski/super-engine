import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

import { client } from '../../api/client';

const notificationAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotofocations',
    async (_, { getState }) => {
        const allNotifications = selectAllNotifications(getState())
        const [latestNotification] = allNotifications
        const latestTimeStamp = latestNotification ? latestNotification.date : ''
        const response = await client.get(`/fakeApi/notifications?since=${latestTimeStamp}`)
        return response.data
    }
)

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: notificationAdapter.getInitialState(),
    reducers: {
        allNotificationsRead(state, action) {
            Object.values(state.entities).forEach(notification => {
                notification.read = true;
            })
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchNotifications.fulfilled, (state, action) => {
            Object.values(state.entities).forEach(notification => {
                // Any notifications we've read are no longer new
                notification.isNew = !notification.read
            })
            notificationAdapter.upsertMany(state, action.payload)
        })
    }
})

export default notificationSlice.reducer
export const { allNotificationsRead } = notificationSlice.actions

export const { selectAll: selectAllNotifications} = notificationAdapter.getSelectors(state => state.notifications)