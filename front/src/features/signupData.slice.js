import { createSlice } from "@reduxjs/toolkit";

export const signupDataSlice = createSlice({
    name: "signupData",
    initialState: {
        signupData: null,
    },
    reducers: {
        setSignupData: (state, { payload }) => {
            state.signupData = payload;
        }
    },
});

export const { setSignupData } = signupDataSlice.actions;
export default signupDataSlice.reducer;