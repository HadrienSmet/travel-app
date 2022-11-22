import { createSlice } from "@reduxjs/toolkit";

export const albumObjectArraySlice = createSlice({
    name: "albumObjectArray",
    initialState: {
        albumObjectArray: [],
    },
    reducers: {
        setAlbumObjectArrayStore: (state, { payload }) => {
            state.albumObjectArray.push({ ...payload })
        },
        resetAlbumObjectArray: (state, { payload }) => {
            state.albumObjectArray = payload;
        }

    },
});

export const { setAlbumObjectArrayStore, resetAlbumObjectArray } = albumObjectArraySlice.actions;
export default albumObjectArraySlice.reducer;