import { createSlice } from "@reduxjs/toolkit";

export const userLoggedDataSlice = createSlice({
    name: "userLoggedData",
    initialState: {
        userLoggedData: null,
    },
    reducers: {
        setUserLoggedData: (state, { payload }) => {
            state.userLoggedData = payload;
        }
    },
});

export const { setUserLoggedData } = userLoggedDataSlice.actions;
export default userLoggedDataSlice.reducer;