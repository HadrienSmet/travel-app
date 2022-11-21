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
        }
    },
});

export const { 
    setUserLoggedData, 
    pushAlbumInUserLoggedData,
    pushTripInUserLoggedData
} = userLoggedDataSlice.actions;
export default userLoggedDataSlice.reducer;