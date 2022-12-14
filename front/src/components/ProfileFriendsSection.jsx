import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriendData } from "../features/friendData.slice";
import { getJwtToken } from "../utils/functions/tools";

const ProfileFriendsSection = ({ isAuthor, dataFrom }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { token } = getJwtToken();
    let followers = dataFrom.followers;
    let following = dataFrom.following;

    //This function allows the user to go on the profile page of the user who made the post
    //It makes a call API using the pseudo of the user in orger to get all the necessary data
    //Then if it succeeded it displays the data inside the redux store before leading the user to the right page
    const goToProfilePage = (e) => {
        console.log(e);
        let pseudo = e.target.id.split("-")[0];
        axios({
            url: `${process.env.REACT_APP_API_URL}api/auth/userProfile/${pseudo}`,
            method: "get",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${token}`,
            },
        })
            .then((res) => {
                dispatch(setFriendData(res.data));
                navigate("/friend-profile");
            })
            .catch((err) => console.log(err));
    };

    return (
        <section className="profile-contact-section">
            <h1>Contacts</h1>
            <div className="profile-contact-section__followers-division">
                {isAuthor === true ? (
                    <div className="profile-contact-section__jsx-container">
                        <h2>Vos abonnés</h2>
                        {followers[0] === undefined ? (
                            <p>
                                Y aura bientot tous les utilisateurs te suivant
                                ici!
                            </p>
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
                ) : (
                    <div className="profile-contact-section__jsx-container">
                        <h2>Ses abonnés</h2>
                        {followers[0] === undefined ? (
                            <p>
                                Y aura bientot tous les utilisateurs suivant ce
                                profil ici!
                            </p>
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
                )}
            </div>
            <div className="profile-contact-section__following-division">
                {isAuthor === true ? (
                    <div className="profile-contact-section__jsx-container">
                        <h2>Vos abonnements</h2>
                        {following[0] === undefined ? (
                            <p>
                                Y aura bientot tous les utilisateurs que tu suis
                                ici!
                            </p>
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
                ) : (
                    <div className="profile-contact-section__jsx-container">
                        <h2>Ses abonnements</h2>
                        {following[0] === undefined ? (
                            <p>
                                Y aura bientot tous les utilisateurs que ce
                                profil suit ici!
                            </p>
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
                )}
            </div>
        </section>
    );
};

export default ProfileFriendsSection;
