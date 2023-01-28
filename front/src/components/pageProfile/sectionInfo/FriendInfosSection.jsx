const FriendInfosSection = ({ dataFrom }) => {
    return (
        <div className="profile-infos-section-friend">
            <h1>Ses informations personnelles :</h1>
            <div className="profile-infos-section__content">
                <div className="profile-infos-section__left-column">
                    <span>
                        <strong>Prénom: </strong>
                        {dataFrom.userData.firstName}
                    </span>
                    <span>
                        <strong>Nom: </strong>
                        {dataFrom.userData.lastName}
                    </span>
                    <span>
                        <strong>Age: </strong>
                        {dataFrom.userData.age}
                    </span>
                    <span>
                        <strong>Genre: </strong>
                        {dataFrom.userData.gender}
                    </span>
                </div>
                <div className="profile-infos-section__right-column">
                    <span>
                        <strong>Email: </strong>
                        {dataFrom.email}
                    </span>
                    <span>
                        <strong>Pays: </strong>
                        {dataFrom.userData.country}
                    </span>
                    <span>
                        <strong>Description: </strong>
                        {dataFrom.description}
                    </span>
                    <div className="profile-infos-section__dream-trips-div">
                        <strong>Mes destinations des rêve: </strong>
                        <ul>
                            {dataFrom.dreamTrips.map((destination) => (
                                <li key={destination}>{destination}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FriendInfosSection;
