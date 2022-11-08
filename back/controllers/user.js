require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

//Handles what happens when the user submits the sign up form
//Starts by hashing the password --> 10 times
// --> Warning: bcrypt.hash is async function
//If hash succes: -create a new Object to post to the database with the password hashed
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.userAuth.password, 10)
    .then(hash => {
        const user = new UserModel({
            userAuth: {
                email: req.body.userAuth.email,
                password: hash,
            },
            userData: {
                firstName: req.body.userData.firstName,
                lastName: req.body.userData.lastName,
                age: req.body.userData.age,
                gender: req.body.userData.gender,
                country: req.body.userData.country,
            },
            userProfile: {
                pseudo: req.body.userProfile.pseudo,
                description: req.body.userProfile.description,
                dreamTrips: req.body.userProfile.dreamTrips,
                previousTrips: req.body.userProfile.previousTrips,
            }
        });
        user.save()
        .then(() => {
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '24h' }
                ),
                userProfileData: user.userProfile,
            });
        })
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};



//This function handles the uploading of the profile picture inside the data base and inside the API
//It starts by taking the file in the request in order to put it into a variable with the appropriate name
//Then we start searching in the data base for a user whose id matches with the one from the request url
//If the user is found we take care to be sure about the authentification by comparing the user's id and the one from the auth middleware
//If everything is ok we can set the new key a the root of the user object
 exports.uploadUserPictures = (req, res, next) => {
    UserModel.findOne({ _id: req.params.id })
    .then((user) => {
        if ( user._id != req.auth.userId) {
            res.status(403).json({ error });
        } else {
            let urlProfilePicture = `${req.protocol}://${req.get('host')}/images/${req.files[0].filename}`;
            let urlsAlbumPictures = [];
            for (let i = 1; i < req.files.length; i++) {
                urlsAlbumPictures.push(`${req.protocol}://${req.get('host')}/images/${req.files[i].filename}`)
            }
            UserModel.updateOne(
                { _id: req.auth.userId }, 
                { $set: { 
                    profilePicture: urlProfilePicture, 
                    albums: [{
                        name: req.body.albumName,
                        pictures: urlsAlbumPictures,
                    }],
                } }
            ) 
            .then(() => res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '24h' }
                    )
                })
            )
            .catch(error => res.status(401).json({ error }));
        }
    })
    .catch(error => res.status(401).json({ error }));
 }

  //Handles what happens when the user submits the sign in form
  //Starts by searching an email in the data matching whit one provided by the user
  //Error if the mailadress can't be found
  //If not we compare the password provided by the user with the one in the database
  //Warning --> bcrypt.compare is async function
  //If passwords match: provides an authorisation token to the user
exports.login = (req, res, next) => {
    UserModel.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: "Cet email n'est pas présent dans notre base de donnée"});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    console.log("cntrllrs.user l: 43 signature jwt:" + jwt.sign(
                        { userId: user._id },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '24h' }
                    ));
                    res.status(200).json({
                        email: user.email,
                        profilePicture: user.profilePicture,
                        pseudo: user.pseudo,
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.ACCESS_TOKEN_SECRET,
                            { expiresIn: '24h' }
                        ),
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };



 