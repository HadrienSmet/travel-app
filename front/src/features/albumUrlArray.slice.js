import { createSlice } from "@reduxjs/toolkit";

export const albumUrlArraySlice = createSlice({
    name: "albumUrlArray",
    initialState: {
        albumUrlArray: null,
    },
    reducers: {
        setAlbumUrlArrayStore: (state, { payload }) => {
            state.albumUrlArray = { ...payload };
        }
    },
});

export const { setAlbumUrlArrayStore } = albumUrlArraySlice.actions;
export default albumUrlArraySlice.reducer;