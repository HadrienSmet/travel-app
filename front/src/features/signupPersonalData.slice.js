import { createSlice } from "@reduxjs/toolkit";

export const signupPersonalDataSlice = createSlice({
    name: "signupPersonalData",
    initialState: {
        signupPersonalData: null,
    },
    reducers: {
        setSignupPersonalData: (state, { payload }) => {
            state.signupPersonalData = payload;
        }
    },
});

export const { setSignupPersonalData } = signupPersonalDataSlice.actions;
export default signupPersonalDataSlice.reducer;