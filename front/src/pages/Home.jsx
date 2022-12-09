import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPostsData } from '../features/postsData.slice';
import { getJwtToken } from '../utils/functions/tools';
import Globe3D from '../components/Globe3D';
import MUIGradientBorder from '../components/MUIGradientBorder';
import Post from '../components/Post';
import PostsForm from '../components/PostsForm';

const Home = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userLoggedDataStore.userLoggedData);
    const postsData = useSelector((state) => state.postsDataStore.postsData);
    let { token } = getJwtToken();
    let dataArrayForSort;
    postsData !== null ? dataArrayForSort = [...postsData] : dataArrayForSort = [];
    
    //This function gets from the API all the posts and displays it into the redux store
    const fetchAllposts = () => {
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
    }
    
    //This function is called when the user click on a country
    //@Params { Type: String } => The country selected by the user
    //It gets from the data base all the posts made by the users from the country selected
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
    
    //This useEffect calls a funciton in order to get all the posts from the data base and it put all of them in the redux store
    useEffect(() => {
        fetchAllposts();
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [])

    return (
        <main>
            <div className="fake-margin-replacing-header"></div>
            <section className="home__content">
                <div className="home__content__header">
                    <div className="home__content__header__intro-and-btn-area">
                        <div className="home__content__header__profile-division">
                            <div className="home__content__header__profile-division__img-container">
                                <img src={userData.profilePicture} alt={"photo de profil de " + userData.pseudo} />
                            </div>
                            <h1>Bonjour {userData.pseudo}</h1>
                        </div>
                        <MUIGradientBorder>
                            <a 
                                href='#home_anchor' 
                                className='home__content__header__reset-btn'
                                onClick={() => fetchAllposts()}>Réinitialiser</a>
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