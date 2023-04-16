import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setFriendData } from "../../features/friendData.slice";

import { axiosGetUser } from "../../utils/functions/user/axiosGetUser";
import { getJwtToken } from "../../utils/functions/tools/getJwtToken";
import { dateParser } from "../../utils/functions/tools/datePaser";
import { mobileDateParser } from "../../utils/functions/tools/mobileDateParser";

const usePostHeader = ({ post }) => {
    const { token } = getJwtToken();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const parsedDateArr = dateParser(post.date).split(",");
    const dayData = parsedDateArr[0];
    const timeData = parsedDateArr[1].split(":").splice(0, 2).join(":");

    //This function allows the user to go on the profile page of the user who made the post
    //It makes a call API using the pseudo of the user in orger to get all the necessary data
    //Then if it succeeded it displays the data inside the redux store before leading the user to the right page
    const goToProfilePage = () => {
        axiosGetUser(post.pseudo, token).then((res) => {
            dispatch(setFriendData(res.data));
            navigate("/friend-profile");
        });
    };

    return {
        dayData,
        timeData,
        goToProfilePage,
    };
};

const PostHeader = ({ post }) => {
    const { dayData, timeData, goToProfilePage } = usePostHeader({ post });

    return (
        <div className="post-header">
            <div
                className="post-header__user-side"
                onClick={() => goToProfilePage()}
            >
                <h3>{post.pseudo}</h3>
                <div className="post-header__user-side__img-container">
                    <img
                        src={post.profilePicture}
                        alt={"photo de profil de " + post.pseudo}
                    />
                </div>
            </div>
            <div className="post-header__data-side">
                <div className="post-header__data-side__desktop-date">
                    <p>{dayData}</p>
                    <p className="post-header__data-side__desktop-date-time">
                        {timeData}
                    </p>
                </div>
                <p className="post-header__data-side__mobile-date">
                    {mobileDateParser(post.date)}
                </p>
                <p>{post.country}</p>
            </div>
        </div>
    );
};

export default PostHeader;
