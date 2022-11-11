import { createSlice } from "@reduxjs/toolkit";

export const loggedStateSlice = createSlice({
    name: "loggedState",
    initialState: {
        loggedState: null,
    },
    reducers: {
        setLoggedState: (state, { payload }) => {
            state.loggedState = payload;
        }
    },
});

export const { setLoggedState } = loggedStateSlice.actions;
export default loggedStateSlice.reducer;