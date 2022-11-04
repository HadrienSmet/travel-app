import { createSlice } from "@reduxjs/toolkit";

export const albumObjectArraySlice = createSlice({
    name: "albumObjectArray",
    initialState: {
        albumObjectArray: [],
    },
    reducers: {
        setAlbumObjectArrayStore: (state, { payload }) => {
            state.albumObjectArray.push({ ...payload });
        }
    },
});

export const { setAlbumObjectArrayStore } = albumObjectArraySlice.actions;
export default albumObjectArraySlice.reducer;