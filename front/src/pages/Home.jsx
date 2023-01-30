import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPostsData } from "../features/postsData.slice";
import { getJwtToken } from "../utils/functions/tools/getJwtToken";
import Globe3D from "../components/Globe3D";
import MUIGradientBorder from "../components/mui/MUIGradientBorder";
import { useCallback } from "react";
import HomeContent from "../components/pageHome/HomeContent";
import { axiosGetPostsFromCountry } from "../utils/functions/posts/axiosGetPostsFromCountry";
import { axiosGetPosts } from "../utils/functions/posts/axiosGetPosts";

const useHome = () => {
    const [allPosts, setAllPosts] = useState(true);
    const [loadPost, setLoadPost] = useState(true);
    const [noResult, setNoResult] = useState(false);

    const handleAllPosts = (boolean) => setAllPosts(boolean);
    const handleLoadPost = (boolean) => setLoadPost(boolean);
    const handleNoResult = (boolean) => setNoResult(boolean);

    //This function is here to activate the useEffect whenever the user starts to see the footer
    const loadMore = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 126 >
            document.scrollingElement.scrollHeight
        ) {
            handleLoadPost(true);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return {
        allPosts,
        loadPost,
        noResult,
        handleAllPosts,
        handleLoadPost,
        handleNoResult,
        loadMore,
    };
};

const useDefaultHome = ({ token, dispatch }) => {
    const [count, setCount] = useState(10);
    const { allPosts, loadPost, handleLoadPost, loadMore } = useHome();

    //This function gets from the API all the posts and displays it into the redux store
    //@Params { type: Number } => referring the number of posts that will be displayed
    const fetchAllposts = useCallback(
        (num) => {
            axiosGetPosts(token).then((res) => {
                const array = res.data
                    .sort((a, b) => b.date - a.date)
                    .slice(0, num);
                dispatch(setPostsData(array));
            });
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
            handleLoadPost(() => false);
            setCount(() => count + 5);
        }

        allPosts && window.addEventListener("scroll", loadMore);

        return () => allPosts && window.removeEventListener("scroll", loadMore);
    }, [loadPost, count, allPosts, fetchAllposts, handleLoadPost, loadMore]);

    return {
        fetchAllposts,
    };
};

const useSpecifiedHome = ({ token, dispatch }) => {
    const [specifiedLoadPost, setSpecifiedLoadPost] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [specifiedCount, setSpecifiedCount] = useState(10);
    const { allPosts, handleAllPosts, handleNoResult } = useHome();

    const handleSpecifiedLoadPost = (boolean) => setSpecifiedLoadPost(boolean);
    const handleSelectedCountry = (country) => setSelectedCountry(country);
    const handleSpecifiedCount = (count) => setSpecifiedCount(count);

    const changeSelectedCountry = (country) => {
        handleSelectedCountry(country);
        handleSpecifiedLoadPost(true);
    };

    const fetchSpecifiedPosts = useCallback(
        (num) => {
            handleAllPosts(false);
            axiosGetPostsFromCountry(selectedCountry, token).then((res) => {
                if (res.data.length > 0) {
                    const array = res.data
                        .sort((a, b) => b.date - a.date)
                        .slice(0, num);
                    dispatch(setPostsData(array));
                    handleNoResult(false);
                } else {
                    handleNoResult(true);
                }
            });
        },
        [handleAllPosts, selectedCountry, token, dispatch, handleNoResult]
    );

    //This useEffect is here to get the posts made by a specified user and then displays all the data in the redux store
    //If the app indicates by his local state that posts have to be loaded:
    //A function to make the call API is called, then when indicate to the app that it doesn't need anymore to load posts and then increase the amount of posts that will be called next time
    //This useEffect is also listening an event on the window in order to check how far the user scrolled the page
    useEffect(() => {
        const loadSpecified = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop + 126 >
                document.scrollingElement.scrollHeight
            ) {
                handleSpecifiedLoadPost(true);
            }
        };
        if (specifiedLoadPost) {
            fetchSpecifiedPosts(specifiedCount);
            handleSpecifiedLoadPost(() => false);
            handleSpecifiedCount(() => specifiedCount + 5);
        }

        !allPosts && window.addEventListener("scroll", loadSpecified);

        return () =>
            !allPosts && window.removeEventListener("scroll", loadSpecified);
    }, [allPosts, fetchSpecifiedPosts, specifiedCount, specifiedLoadPost]);

    return {
        changeSelectedCountry,
    };
};

const Home = () => {
    const dispatch = useDispatch();
    let { token } = getJwtToken();
    const { noResult } = useHome();
    const { fetchAllposts } = useDefaultHome({ token, dispatch });
    const { changeSelectedCountry } = useSpecifiedHome({ token, dispatch });

    const userData = useSelector(
        (state) => state.userLoggedDataStore.userLoggedData
    );
    const postsData = useSelector((state) => state.postsDataStore.postsData);
    let dataArrayForSort;
    postsData !== null
        ? (dataArrayForSort = [...postsData])
        : (dataArrayForSort = []);

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
