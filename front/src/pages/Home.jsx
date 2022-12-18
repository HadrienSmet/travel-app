import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPostsData } from "../features/postsData.slice";
import { getJwtToken } from "../utils/functions/tools";
import Globe3D from "../components/Globe3D";
import MUIGradientBorder from "../components/MUIGradientBorder";
import Post from "../components/Post";
import PostsForm from "../components/PostsForm";
import { useCallback } from "react";

const Home = () => {
    const [loadPost, setLoadPost] = useState(true);
    const [noResult, setNoResult] = useState(false);
    const [count, setCount] = useState(10);
    const dispatch = useDispatch();
    const userData = useSelector(
        (state) => state.userLoggedDataStore.userLoggedData
    );
    const postsData = useSelector((state) => state.postsDataStore.postsData);
    let { token } = getJwtToken();
    let dataArrayForSort;
    postsData !== null
        ? (dataArrayForSort = [...postsData])
        : (dataArrayForSort = []);

    //This function is called when the user click on a country
    //@Params { Type: String } => The country selected by the user
    //It gets from the data base all the posts made by the users from the country selected
    const changeSelectedCountry = (country) => {
        axios({
            url: `${process.env.REACT_APP_API_URL}api/posts/from/${country}`,
            method: "get",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.data.length > 0) {
                    dispatch(setPostsData(res.data));
                    setNoResult(false);
                } else {
                    setNoResult(true);
                }
            })
            .catch((err) => console.log(err));
    };

    //This function is here to activate the useEffect whenever the user starts to see the footer
    const loadMore = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 126 >
            document.scrollingElement.scrollHeight
        ) {
            setLoadPost(true);
        }
    };

    //This function gets from the API all the posts and displays it into the redux store
    //@Params { type: Number } => referring the number of posts that will be displayed
    const fetchAllposts = useCallback(
        (num) => {
            axios({
                url: `${process.env.REACT_APP_API_URL}api/posts`,
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `bearer ${token}`,
                },
            })
                .then((res) => {
                    const array = res.data
                        .sort((a, b) => b.date - a.date)
                        .slice(0, num);
                    dispatch(setPostsData(array));
                })
                .catch((err) => console.log(err));
        },
        [dispatch, token]
    );
    //This useEffect is here to get the posts made by a specified user and then displays all the data in the redux store
    //If the app indicates by his local state that posts have to be loaded:
    //A function to make the call API is called, then when indicate to the app that it doesn't need anymore to load posts and then increase the amount of posts that will be called next time
    //This useEffect is also listening an event on the window in order to check how far the user scrolled the page
    useEffect(() => {
        if (loadPost) {
            fetchAllposts(count);
            setLoadPost(() => false);
            setCount(() => count + 5);
        }

        window.addEventListener("scroll", loadMore);

        return () => window.removeEventListener("scroll", loadMore);
    }, [loadPost, count, fetchAllposts]);

    return (
        <main>
            <div id="go-on-top" className="fake-margin-replacing-header"></div>
            <section className="home__content">
                <div className="home__content__header">
                    <div className="home__content__header__intro-and-btn-area">
                        <div className="home__content__header__profile-division">
                            <div className="home__content__header__profile-division__img-container">
                                <img
                                    src={userData.profilePicture}
                                    alt={
                                        "photo de profil de " + userData.pseudo
                                    }
                                />
                            </div>
                            <h1>Bonjour {userData.pseudo}</h1>
                        </div>
                        <MUIGradientBorder>
                            <a
                                href="#home_anchor"
                                className="home__content__header__reset-btn"
                                onClick={() => fetchAllposts()}
                            >
                                Réinitialiser
                            </a>
                        </MUIGradientBorder>
                    </div>
                    <div className="home__content__header__globe-area">
                        <h2>Venez voir ce qu'il se passe ailleurs</h2>
                        <Globe3D
                            dynamicClassName="home"
                            changeSelectedCountry={changeSelectedCountry}
                        />
                    </div>
                </div>
                <div id="home_anchor" className="home__content__main">
                    <div className="home__content__posts-division">
                        <PostsForm />
                        {noResult && <h3>Aucuns posts n'a encore été créé dans ce pays</h3>}
                        {!noResult && dataArrayForSort !== null &&
                            dataArrayForSort
                                .sort((a, b) => b.date - a.date)
                                .map((post, index) => (
                                    <Post key={index} post={post} />
                                ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;
