import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFriendData } from "../../../features/friendData.slice";

import { axiosGetUser } from "../../../utils/functions/user/axiosGetUser";
import { getJwtToken } from "../../../utils/functions/tools/getJwtToken";

import FollowersSection from "./FollowersSection";
import FollowingSection from "./FollowingSection";

const useProfileFriendsSection = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { token } = getJwtToken();

    //This function allows the user to go on the profile page of the user who made the post
    //It makes a call API using the pseudo of the user in orger to get all the necessary data
    //Then if it succeeded it displays the data inside the redux store before leading the user to the right page
    const goToProfilePage = (e) => {
        let pseudo = e.target.id.split("-")[0];
        axiosGetUser(pseudo, token)
            .then((res) => {
                dispatch(setFriendData(res.data));
                navigate("/friend-profile");
            })
            .catch((err) => console.log(err));
    };

    return {
        goToProfilePage,
    };
};

const ProfileFriendsSection = ({ isAuthor, dataFrom }) => {
    const { goToProfilePage } = useProfileFriendsSection();
    let followers = dataFrom.followers;
    let following = dataFrom.following;

    return (
        <section className="profile-contact-section">
            <h1>Contacts</h1>
            <div className="profile-contact-section__followers-division">
                <FollowersSection
                    followers={followers}
                    goToProfilePage={goToProfilePage}
                    isAuthor={isAuthor}
                />
            </div>
            <div className="profile-contact-section__following-division">
                <FollowingSection
                    following={following}
                    goToProfilePage={goToProfilePage}
                    isAuthor={isAuthor}
                />
            </div>
        </section>
    );
};

export default ProfileFriendsSection;
