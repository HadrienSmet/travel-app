import { configureStore } from "@reduxjs/toolkit"; 
import welcomeStateReducer from "../features/welcomeState.slice";
import signupReducer from "../features/signupData.slice";
import userReducer from "../features/userData.slice";
import albumObjectReducer from "../features/albumObjectArray.slice"

export default configureStore({
    reducer: {
        currentWelcomeState: welcomeStateReducer,
        newSignupData: signupReducer,
        userDataStore: userReducer,
        albumObjectArrayStore: albumObjectReducer,
    }
})