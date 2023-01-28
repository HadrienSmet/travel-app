const UserInfosSection = ({ dataFrom }) => {
    return (
        <div className="profile-infos-section-user">
            <h1>Mes informations personnelles :</h1>
            <div className="profile-infos-section__content">
                <div className="profile-infos-section__left-column">
                    <span>
                        <strong>Prénom: </strong>
                        {dataFrom.firstName}
                    </span>
                    <span>
                        <strong>Nom: </strong>
                        {dataFrom.lastName}
                    </span>
                    <span>
                        <strong>Age: </strong>
                        {dataFrom.age}
                    </span>
                    <span>
                        <strong>Genre: </strong>
                        {dataFrom.gender}
                    </span>
                </div>
                <div className="profile-infos-section__right-column">
                    <span>
                        <strong>Email: </strong>
                        {dataFrom.email}
                    </span>
                    <span>
                        <strong>Pays: </strong>
                        {dataFrom.country}
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

export default UserInfosSection;
