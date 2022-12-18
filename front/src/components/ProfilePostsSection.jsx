import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPostsData } from "../features/postsData.slice";
import { getJwtToken } from "../utils/functions/tools";
import Post from "./Post";

const ProfilePostsSection = () => {
    const [loadPost, setLoadPost] = useState(true);
    const [count, setCount] = useState(5);
    const dispatch = useDispatch();
    const userPosts = useSelector((state) => state.postsDataStore.postsData);
    let postsArray = [...userPosts];
    let { userId, token } = getJwtToken();

    //This function gets from the API all the posts and displays it into the redux store
    //@Params { type: Number } => referring the number of posts that will be displayed
    const fetchAllposts = useCallback(
        (num) => {
            axios({
                url: `${process.env.REACT_APP_API_URL}api/posts/by/${userId}`,
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `bearer ${token}`,
                },
            })
                .then((res) => {
                    const array = res.data
                        .sort((a, b) => b.date - a.date)
                        .splice(0, num);
                    dispatch(setPostsData(array));
                })
                .catch((err) => console.log(err));
        },
        [dispatch, token, userId]
    );

    //This function is here to activate the useEffect whenever the user starts to see the footer
    const loadMore = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 126 >
            document.scrollingElement.scrollHeight
        ) {
            setLoadPost(true);
        }
    };

    //This useEffect is here to get the posts made by a specified user and then displays all the data in the redux store
    //If the app indicates by his local state that posts have to be loaded:
    //A function to make the call API is called, then when indicate to the app that it doesn't need anymore to load posts and then increase the amount of posts that will be called next time
    //This useEffect is also listening an event on the window in order to check how far the user scrolled the page
    useEffect(() => {
        if (loadPost) {
            fetchAllposts(count);
            setLoadPost(false);
            setCount(count + 5);
        }

        window.addEventListener("scroll", loadMore);

        return () => window.removeEventListener("scroll", loadMore);
    }, [loadPost, count, fetchAllposts]);

    return (
        <section className="profile__posts-section">
            <h1>Posté dernièrement</h1>
            <div className="profile__posts-section__posts-div">
                {userPosts !== undefined &&
                    postsArray
                        .sort((a, b) => b.date - a.date)
                        .map((post, index) => <Post key={index} post={post} />)}
                {userPosts === undefined && (
                    <h2>Venez poster vos expériences sur la plateforme!</h2>
                )}
            </div>
        </section>
    );
};

export default ProfilePostsSection;
