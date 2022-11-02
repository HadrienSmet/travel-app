import { createSlice } from "@reduxjs/toolkit";

export const userDataSlice = createSlice({
    name: "userData",
    initialState: {
        userData: null,
    },
    reducers: {
        setUserData: (state, { payload }) => {
            state.userData = payload;
        }
    },
});

export const { setUserData } = userDataSlice.actions;
export default userDataSlice.reducer;