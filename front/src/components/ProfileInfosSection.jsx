import { useSelector } from 'react-redux';

const ProfileInfosSection = () => {
    const userData = useSelector((state) => state.userLoggedDataStore.userLoggedData);
    return (
        <div className='profile-infos-section'>
            <h3>Mes informations personnelles :</h3>
            <div className="profile-infos-section__content">
                <div className="profile-infos-section__left-column">
                    <span><strong>Prénom: </strong>{userData.firstName}</span>
                    <span><strong>Nom: </strong>{userData.lastName}</span>
                    <span><strong>Age: </strong>{userData.age}</span>
                    <span><strong>Genre: </strong>{userData.gender}</span>
                </div>
                <div className="profile-infos-section__right-column">
                    <span><strong>Email: </strong>{userData.email}</span>
                    <span><strong>Pays: </strong>{userData.country}</span>
                    <span><strong>Description: </strong>{userData.description}</span>
                    <div className="profile-infos-section__dream-trips-div">
                        <strong>Mes destinations des rêve: </strong>
                        <ul>
                            {userData.dreamTrips.map((destination) => (<li>{destination}</li>))}
                        </ul>
                    </div>
                    
                </div>  
            </div>
        </div>
    );
};

export default ProfileInfosSection;