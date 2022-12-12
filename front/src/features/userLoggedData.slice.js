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
        pushAlbumInUserLoggedData: (state, { payload }) => {
            state.userLoggedData.albums.push(payload);
        },
        pushTripInUserLoggedData: (state, { payload }) => {
            state.userLoggedData.previousTrips.push(payload);
        },
        pushFollowingInUserLoggedData: (state, { payload }) => {
            state.userLoggedData.following.push(payload);
        },
        pullFollowingInUserLoggedData: (state, { payload }) => {
            const rightIndex = state.userLoggedData.following.findIndex((user) => user === payload);
            state.userLoggedData.following.splice(rightIndex, 1);
        },
        setCoverPictureInUserLoggedData: (state, { payload }) => {
            state.userLoggedData.coverPicture = payload;
        }
    },
});

export const { 
    setUserLoggedData, 
    pushAlbumInUserLoggedData,
    pushTripInUserLoggedData,
    pushFollowingInUserLoggedData,
    pullFollowingInUserLoggedData,
    setCoverPictureInUserLoggedData
} = userLoggedDataSlice.actions;
export default userLoggedDataSlice.reducer;