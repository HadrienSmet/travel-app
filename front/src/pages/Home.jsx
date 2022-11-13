
import { useSelector } from 'react-redux';
import HomeGlobe3D from '../components/HomeGlobe3D';
import PostsForm from '../components/PostsForm';



const Home = () => {
    const userData = useSelector((state) => state.userLoggedDataStore.userLoggedData);

    return (
        <main>
            <div className="fake-margin-replacing-header"></div>
            <div className="home__content">
                <div className="home__content__header">
                    <div className="home__content__header__profile-division">
                        <div className="home__content__header__profile-division__img-container">
                            <img src={userData.profilePicture} alt={"photo de profil de " + userData.pseudo} />
                        </div>
                        <h1>Bonjour {userData.pseudo}</h1>
                    </div> 
                    <HomeGlobe3D />
                </div>
                <div className="home__content__main">
                    <PostsForm />
                </div>
                
            </div>
        </main>
    );
};

export default Home;