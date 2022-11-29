import { createSlice } from "@reduxjs/toolkit";

export const friendDataSlice = createSlice({
    name: "friendData",
    initialState: {
        friendData: null,
    },
    reducers: {
        setFriendData: (state, { payload }) => {
            state.friendData = payload;
        },
        pushFollowerInFriendData : (state, { payload }) => {
            state.friendData.followers.push(payload);
        },
        pullFollowerInFriendData: (state, { payload }) => {
            const rightIndex = state.friendData.followers.findIndex((user) => user === payload);
            state.friendData.followers.splice(rightIndex, 1);
        }
    },
});

export const { setFriendData, pushFollowerInFriendData, pullFollowerInFriendData } = friendDataSlice.actions;
export default friendDataSlice.reducer;