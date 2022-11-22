const ProfileFriendsSection = ({ isAuthor, dataFrom }) => {
    return (
        <div>
            {isAuthor === true ?
                <p>Y aura bientot tous tes amis ici!</p>
            :
                <p>Y aura bientot tous ses amis ici!</p>
            } 
        </div>
    );
};

export default ProfileFriendsSection;