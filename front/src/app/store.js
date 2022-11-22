import { configureStore } from "@reduxjs/toolkit"; 
import loggedStateReducer from "../features/loggedState.slice";
import welcomeStateReducer from "../features/welcomeState.slice";
import signupReducer from "../features/signupData.slice";
import userLoggedReducer from "../features/userLoggedData.slice";
import albumObjectReducer from "../features/albumObjectArray.slice";
import postsDataReducer from "../features/postsData.slice";
import friendDataReducer from "../features/friendData.slice";

export default configureStore({
    reducer: {
        currentWelcomeState: welcomeStateReducer,
        newSignupData: signupReducer,
        currentLoggedState: loggedStateReducer,
        userLoggedDataStore: userLoggedReducer,
        albumObjectArrayStore: albumObjectReducer,
        postsDataStore: postsDataReducer,
        friendDataStore: friendDataReducer,
    }
});