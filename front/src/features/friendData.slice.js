import { createSlice } from "@reduxjs/toolkit";

export const friendDataSlice = createSlice({
    name: "friendData",
    initialState: {
        friendData: null,
    },
    reducers: {
        setFriendData: (state, { payload }) => {
            state.friendData = payload;
        }
    },
});

export const { setFriendData } = friendDataSlice.actions;
export default friendDataSlice.reducer;