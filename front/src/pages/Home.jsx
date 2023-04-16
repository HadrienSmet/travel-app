import { useEffect, useState, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setPostsData } from "../features/postsData.slice";

import { getJwtToken } from "../utils/functions/tools/getJwtToken";
import { axiosGetPostsFromCountry } from "../utils/functions/posts/axiosGetPostsFromCountry";
import { axiosGetPosts } from "../utils/functions/posts/axiosGetPosts";

import Globe3D from "../components/Globe3D";
import MUIGradientBorder from "../components/mui/MUIGradientBorder";
import HomeContent from "../components/pageHome/HomeContent";
import { useScrollTop } from "../utils/hooks/hooks";

const useHome = () => {
    const [dataArrayForSort, setDataArrayForSort] = useState([]);
    const postsData = useSelector((state) => state.postsDataStore.postsData);
    useScrollTop();

    useEffect(() => {
        if (postsData !== null) {
            setDataArrayForSort([...postsData]);
        } else {
            setDataArrayForSort([]);
        }
    }, [postsData]);

    return {
        dataArrayForSort,
    };
};

//This custom hook handles all the logic about fetching and displaying all the posts stuck in the db
const useDefaultHome = ({
    token,
    dispatch,
    allPosts,
    loadPost,
    setLoadPost,
    setAllPosts,
}) => {
    const [count, setCount] = useState(10);

    //This function gets from the API all the posts and displays it into the redux store
    //@Params { type: Number } => referring the number of posts that will be displayed
    const fetchAllposts = useCallback(
        (num) => {
            setAllPosts(true);
            axiosGetPosts(token).then((res) => {
                const array = res.data
                    .sort((a, b) => b.date - a.date)
                    .slice(0, num);
                dispatch(setPostsData(array));
            });
        },
        [dispatch, token, setAllPosts]
    );
    //This useEffect is here to get the posts made by a specified user and then displays all the data in the redux store
    //If the app indicates by his local state that posts have to be loaded:
    //A function to make the call API is called, then when indicate to the app that it doesn't need anymore to load posts and then increase the amount of posts that will be called next time
    //This useEffect is also listening an event on the window in order to check how far the user scrolled the page
    useEffect(() => {
        const loadMore = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop + 126 >
                document.scrollingElement.scrollHeight
            ) {
                setLoadPost(true);
            }
        };
        if (loadPost) {
            fetchAllposts(count);
            setLoadPost(() => false);
            setCount(() => count + 5);
        }

        allPosts && window.addEventListener("scroll", loadMore);

        return () => allPosts && window.removeEventListener("scroll", loadMore);
    }, [loadPost, count, allPosts, fetchAllposts, setLoadPost]);

    return {
        fetchAllposts,
    };
};

//This custom hook handles all the logic about fetching and displaying all the posts stuck in the db from a selected country
const useSpecifiedHome = ({
    token,
    dispatch,
    allPosts,
    setAllPosts,
    setNoResult,
    setSpecifiedLoadPost,
    specifiedLoadPost,
}) => {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [specifiedCount, setSpecifiedCount] = useState(10);
    const changeSelectedCountry = (country) => {
        setSelectedCountry(country);
        setSpecifiedLoadPost(() => true);
    };

    //A function to make the call API is called, then when indicate to the app that it doesn't need anymore to load posts and then increase the amount of posts that will be called next time
    const fetchSpecifiedPosts = useCallback(
        (num) => {
            setAllPosts(false);
            axiosGetPostsFromCountry(selectedCountry, token).then((res) => {
                if (res.data.length > 0) {
                    const array = res.data
                        .sort((a, b) => b.date - a.date)
                        .slice(0, num);
                    dispatch(setPostsData(array));
                    setNoResult(false);
                } else {
                    setNoResult(true);
                }
            });
        },
        [setAllPosts, selectedCountry, token, dispatch, setNoResult]
    );

    //This useEffect is here to get the posts made from a specified country and then displays all the data in the redux store
    //If the app indicates by his local state that posts have to be loaded:
    //This useEffect is also listening an event on the window in order to check how far the user scrolled the page
    useEffect(() => {
        const loadSpecified = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop + 126 >
                document.scrollingElement.scrollHeight
            ) {
                setSpecifiedLoadPost(true);
            }
        };
        if (specifiedLoadPost) {
            fetchSpecifiedPosts(specifiedCount);
            setSpecifiedLoadPost(() => false);
            setSpecifiedCount(() => specifiedCount + 5);
        }

        !allPosts && window.addEventListener("scroll", loadSpecified);

        return () =>
            !allPosts && window.removeEventListener("scroll", loadSpecified);
    }, [
        allPosts,
        fetchSpecifiedPosts,
        specifiedCount,
        specifiedLoadPost,
        setSpecifiedLoadPost,
    ]);

    return {
        changeSelectedCountry,
    };
};

const Home = () => {
    const [allPosts, setAllPosts] = useState(true);
    const [loadPost, setLoadPost] = useState(true);
    const [noResult, setNoResult] = useState(false);
    const [specifiedLoadPost, setSpecifiedLoadPost] = useState(false);

    const dispatch = useDispatch();
    let { token } = getJwtToken();

    const { dataArrayForSort } = useHome();
    const { fetchAllposts } = useDefaultHome({
        token,
        allPosts,
        loadPost,
        dispatch,
        setAllPosts,
        setLoadPost,
    });
    const { changeSelectedCountry } = useSpecifiedHome({
        token,
        allPosts,
        specifiedLoadPost,
        dispatch,
        setAllPosts,
        setNoResult,
        setSpecifiedLoadPost,
    });

    const userData = useSelector(
        (state) => state.userLoggedDataStore.userLoggedData
    );

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
                            changeSelectedCountry={(value) =>
                                changeSelectedCountry(value)
                            }
                            forHome={true}
                        />
                    </div>
                </div>
                <HomeContent
                    noResult={noResult}
                    dataArrayForSort={dataArrayForSort}
                />
            </section>
        </main>
    );
};

export default Home;
