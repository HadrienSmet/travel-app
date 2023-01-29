import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import { Provider } from "react-redux";

import "./styles/index.scss";

import store from "./app/store";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import SignupSteps from "./pages/SignupSteps";
import Profile from "./pages/Profile";
import FriendProfile from "./pages/FriendProfile";
import Error from "./pages/Error";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ParallaxProvider>
                <Router>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Welcome />} />
                        <Route path="/signup-steps" element={<SignupSteps />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route
                            path="/friend-profile"
                            element={<FriendProfile />}
                        />
                        <Route path="*" element={<Error />} />
                    </Routes>
                    <Footer />
                </Router>
            </ParallaxProvider>
        </Provider>
    </React.StrictMode>
);
