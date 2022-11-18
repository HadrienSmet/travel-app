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
        }
    },
});

export const { setUserLoggedData, pushAlbumInUserLoggedData } = userLoggedDataSlice.actions;
export default userLoggedDataSlice.reducer;