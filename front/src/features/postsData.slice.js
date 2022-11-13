import { createSlice } from "@reduxjs/toolkit";

export const postsDataSlice = createSlice({
    name: "postsData",
    initialState: {
        postsData: null,
    },
    reducers: {
        setPostsData: (state, { payload }) => {
            state.postsData = payload;
        }
    },
});

export const { setPostsData } = postsDataSlice.actions;
export default postsDataSlice.reducer;