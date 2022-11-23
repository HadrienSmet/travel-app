import { createSlice } from "@reduxjs/toolkit";

export const userLoggedDataSlice = createSlice({
    name: "userLoggedData",
    initialState: {
        userLoggedData: null,
    },
    reducers: {
        setUserLoggedData: (state, { payload }) => {
            state.userLoggedData = payload;
        },
        pushAlbumInUserLoggedData : (state, { payload }) => {
            state.userLoggedData.albums.push(payload);
        },
        pushTripInUserLoggedData : (state, { payload }) => {
            state.userLoggedData.previousTrips.push(payload);
        },
        pushFriendInUserLoggedData : (state, { payload }) => {
            state.userLoggedData.friends.push(payload);
        },
        splitThatFriendInUserLoggedData: (state, { payload }) => {
            const rightIndex = state.userLoggedData.friends.findIndex((friend) => friend === payload);
            state.userLoggedData.friends.splice(rightIndex, 1);
        }
    },
});

export const { 
    setUserLoggedData, 
    pushAlbumInUserLoggedData,
    pushTripInUserLoggedData,
    pushFriendInUserLoggedData,
    splitThatFriendInUserLoggedData
} = userLoggedDataSlice.actions;
export default userLoggedDataSlice.reducer;