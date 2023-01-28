import React from "react";

const UserFollowingSection = ({ following, goToProfilePage }) => {
    return (
        <div className="profile-contact-section__jsx-container">
            <h2>Vos abonnements</h2>
            {following[0] === undefined ? (
                <p>Y aura bientot tous les utilisateurs que tu suis ici!</p>
            ) : (
                <ul className="profile-contact-section__following-displayer">
                    {following.map((follow) => (
                        <li
                            id={follow + "-li"}
                            key={follow + "-li"}
                            className="profile-contact-section__border-wrapper"
                            onClick={(e) => goToProfilePage(e)}
                        >
                            <div
                                id={follow + "-div"}
                                className="profile-contact-section__border-line"
                                onClick={(e) => goToProfilePage(e)}
                            ></div>
                            <span
                                id={follow + "-span"}
                                className="profile-contact-section__follow"
                                onClick={(e) => goToProfilePage(e)}
                            >
                                {follow}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserFollowingSection;
