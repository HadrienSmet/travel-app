import React from "react";

const UserFollowersSection = ({ followers, goToProfilePage }) => {
    return (
        <div className="profile-contact-section__jsx-container">
            <h2>Vos abonnés</h2>
            {followers[0] === undefined ? (
                <p>Y aura bientot tous les utilisateurs te suivant ici!</p>
            ) : (
                <ul className="profile-contact-section__followers-displayer">
                    {followers.map((follower) => (
                        <li
                            id={follower + "-li"}
                            key={follower + "-li"}
                            className="profile-contact-section__border-wrapper"
                            onClick={(e) => goToProfilePage(e)}
                        >
                            <div
                                id={follower + "-div"}
                                className="profile-contact-section__border-line"
                                onClick={(e) => goToProfilePage(e)}
                            ></div>
                            <span
                                id={follower + "-span"}
                                className="profile-contact-section__follow"
                                onClick={(e) => goToProfilePage(e)}
                            >
                                {follower}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserFollowersSection;
