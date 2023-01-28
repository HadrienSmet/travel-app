import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriendData } from "../features/friendData.slice";
import { axiosGetUser } from "../utils/functions/axiosGetUser";
import {
    getJwtToken,
    dateParser,
    mobileDateParser,
} from "../utils/functions/tools";

const PostHeader = ({ post }) => {
    const { token } = getJwtToken();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //This function allows the user to go on the profile page of the user who made the post
    //It makes a call API using the pseudo of the user in orger to get all the necessary data
    //Then if it succeeded it displays the data inside the redux store before leading the user to the right page
    const goToProfilePage = () => {
        axiosGetUser(post.pseudo, token)
            .then((res) => {
                dispatch(setFriendData(res.data));
                navigate("/friend-profile");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="post-header">
            <div
                className="post-header__user-side"
                onClick={() => goToProfilePage()}
            >
                <h4>{post.pseudo}</h4>
                <div className="post-header__user-side__img-container">
                    <img
                        src={post.profilePicture}
                        alt={"photo de profil de " + post.pseudo}
                    />
                </div>
            </div>
            <div className="post-header__data-side">
                <p className="post-header__data-side__desktop-date">
                    {dateParser(post.date)}
                </p>
                <p className="post-header__data-side__mobile-date">
                    {mobileDateParser(post.date)}
                </p>
                <p>{post.country}</p>
            </div>
        </div>
    );
};

export default PostHeader;
