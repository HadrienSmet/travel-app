import { createSlice } from "@reduxjs/toolkit";

export const welcomeStateSlice = createSlice({
    name: "welcomeState",
    initialState: {
        welcomeState: null,
    },
    reducers: {
        setWelcomeState: (state, { payload }) => {
            state.welcomeState = payload;
        }
    },
});

export const { setWelcomeState } = welcomeStateSlice.actions;
export default welcomeStateSlice.reducer;