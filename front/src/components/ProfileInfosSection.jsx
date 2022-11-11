import { useSelector } from 'react-redux';

const ProfileInfosSection = () => {
    const userData = useSelector((state) => state.userLoggedDataStore.userLoggedData);
    return (
        <div className='profile-infos-section'>
            <h3>Mes informations personnelles</h3>
            <span>{"Prénom : " + userData.firstName}</span>
            <span>{"Nom : " + userData.lastName}</span>
            <span>{"Age : " + userData.age}</span>
            <span>{"Genre : " + userData.gender}</span>
            <span>{"Email : " + userData.email}</span>
            <span>{"Pays : " + userData.country}</span>
            <span>{"Description : " + userData.description}</span>
            <span>{"Mes destinations des rêve : " + [...userData.dreamTrips]}</span>
        </div>
    );
};

export default ProfileInfosSection;