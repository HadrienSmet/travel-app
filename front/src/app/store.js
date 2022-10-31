import { configureStore } from "@reduxjs/toolkit"; 
import welcomeStateReducer from "../features/welcomeState.slice";
import signupReducer from "../features/signupData.slice";
import signupPersonalReducer from "../features/signupPersonalData.slice"

export default configureStore({
    reducer: {
        currentWelcomeState: welcomeStateReducer,
        newSignupData: signupReducer,
        newSignupPersonalData: signupPersonalReducer
    }
})