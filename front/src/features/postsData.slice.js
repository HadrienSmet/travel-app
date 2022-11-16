import { createSlice } from "@reduxjs/toolkit";

export const postsDataSlice = createSlice({
    name: "postsData",
    initialState: {
        postsData: null,
    },
    reducers: {
        setPostsData: (state, { payload }) => {
            state.postsData = payload;
        },
        deletePost: (state, { payload }) => {
            const rightIndex = state.postsData.findIndex((post) => post._id === payload);
            state.postsData.splice(rightIndex, 1);    
        },
    },
});

export const { setPostsData, deletePost } = postsDataSlice.actions;
export default postsDataSlice.reducer;