import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomeGlobe3D from '../components/HomeGlobe3D';
import Post from '../components/Post';
import PostsForm from '../components/PostsForm';
import { setPostsData } from '../features/postsData.slice';
import { getJwtToken } from '../utils/functions/tools';



const Home = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userLoggedDataStore.userLoggedData);
    const postsData = useSelector((state) => state.postsDataStore.postsData);
    let { token } = getJwtToken();
    let dataArrayForSort;
    postsData !== null ? dataArrayForSort = [...postsData] : dataArrayForSort = [];

    useEffect(() => {
        axios({
            url: `${process.env.REACT_APP_API_URL}api/posts`,
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "authorization": `bearer ${token}`
            }
        })
        .then(res => {
                dispatch(setPostsData(res.data));
        })
        .catch(err => console.log(err));
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [])

    const changeSelectedCountry = (country) => {
        axios({
            url: `${process.env.REACT_APP_API_URL}api/posts/from/${country}`,
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "authorization": `bearer ${token}`
            }
        })
        .then(res => {
            dispatch(setPostsData(res.data));
        })
        .catch(err => console.log(err));
    }

    return (
        <main>
            <div className="fake-margin-replacing-header"></div>
            <section className="home__content">
                <div className="home__content__header">
                    <div className="home__content__header__profile-division">
                        <div className="home__content__header__profile-division__img-container">
                            <img src={userData.profilePicture} alt={"photo de profil de " + userData.pseudo} />
                        </div>
                        <h1>Bonjour {userData.pseudo}</h1>
                    </div> 
                    <HomeGlobe3D changeSelectedCountry={changeSelectedCountry} />
                </div>
                <div className="home__content__main">
                    <div className="home__content__posts-division">
                        <PostsForm />
                        {dataArrayForSort !== null && dataArrayForSort
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