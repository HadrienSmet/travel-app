import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPostsData } from '../features/postsData.slice';
import { getJwtToken } from '../utils/functions/tools';
import Post from './Post';

const ProfilePostsSection = () => {
    const dispatch = useDispatch();
    const userPosts = useSelector((state) => state.postsDataStore.postsData);
    let postsArray = [...userPosts]
    let { userId, token } = getJwtToken();

    useEffect(() => {
        axios({
            url: `${process.env.REACT_APP_API_URL}api/posts/by/${userId}`,
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "authorization": `bearer ${token}`
            }
        })
        .then(res => dispatch(setPostsData(res.data)))
        .catch(err => console.log(err));
    /* eslint-disable react-hooks/exhaustive-deps */
    }, [])
    return (
        <section className="profile__posts-section">
            <div className="profile__posts-section__posts-div">
                {userPosts !== undefined && 
                    postsArray
                    .sort((a, b) => b.date - a.date)
                    .map((post, index) => (
                        <Post key={index} post={post} />
                    ))
                }
                {userPosts === undefined && <h4>Venez poster vos expériences sur la plateforme!</h4>}
            </div>
            
        </section>
        
    );
};

export default ProfilePostsSection;