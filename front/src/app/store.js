import { configureStore } from "@reduxjs/toolkit"; 
import welcomeStateReducer from "../features/welcomeState.slice";
import signupReducer from "../features/signupData.slice";
import userReducer from "../features/userData.slice";
import albumUrlReducer from "../features/albumUrlArray.slice"

export default configureStore({
    reducer: {
        currentWelcomeState: welcomeStateReducer,
        newSignupData: signupReducer,
        userDataStore: userReducer,
        albumUrlArrayStore: albumUrlReducer,
    }
})