const Post = require('../models/Post');
const fs = require('fs');
const { log } = require('console');

//Creates a new post : --> Gets the data from the request
//Deletes id and user id for security reasons
//Creates a new object before sending it to the data base
exports.createPost = (req, res, next) => {
    let url;
    const postObject = JSON.stringify(req.body);
    delete postObject._userId;
    console.log("controllers.posts l:13 postObject: " + postObject)
    // console.log("controllers.posts l:14 url: " + url)
    console.log("controllers.posts l:15 req.file: " + req.file)
    console.log("controllers.posts l:16 req.files: " + req.files)
    if (req.files[0] === undefined) {
        url = "";
    } else {
        url = `${req.protocol}://${req.get('host')}/images/${req.files[0].filename}`;
    }
    let { country, pseudo, profilePicture, text, date } = JSON.parse(postObject);
    
    const post = new Post({
        userId: req.auth.userId,
        country,
        pseudo,
        profilePicture,
        text,
        imageUrl: url,
        date,
    });
    
    post.save()
        .then(() => { res.status(201).json({message: 'Post enregistré!'})})
        .catch(error => { res.status(400).json( { error })})
 };

 //Changes a post already sent to the data base
 //Gets the data from the request and checks if it contains a file
 //If there is a file we get request's body but we change the value on the imageUrl's property
 //If there is no file we keep the request's body intact
exports.modifyPost = (req, res, next) => {
    console.log("ctrllr.post l:43 req.body: " + JSON.stringify({ ...req.body }));
    console.log("ctrllr.post l:44 req.file: " + req.file);
    console.log("ctrllr.post l:45 req.files: " + req.files);
    let postObject;
    if (req.body.file == "") {
        postObject = {
            ...req.body,
            imageUrl: ""
        };
    } else if (req.files) {
        postObject = {
            ...req.body,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.files[0].filename}`
        };
    } else {
        postObject = { ...req.body };
    }

    console.log("ctrllr.posts l:41 postObject: " + JSON.stringify(postObject));

    delete postObject._userId;
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if ( post.userId == req.auth.userId || process.env.ADMIN_ACCOUNT_ID == req.auth.userId) {
                const filename = post.imageUrl.split('/images/')[1];
                console.log(filename);
                if (req.files) {
                    console.log("ctrllr.post l:55: " + JSON.stringify(postObject));
                    fs.unlink(`images/${filename}`, () => {
                        Post.updateOne({ _id: req.params.id }, { ...postObject, id: req.params.id })
                            .then(() => res.status(200).json({ message: 'Post modifié!' }))
                            .catch(error => res.status(401).json({ error }));
                    });
                } else {
                    Post.updateOne({ _id: req.params.id }, { ...postObject, id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Post modifié!' }))
                    .catch(error => res.status(401).json({ error }));
                }
            } else {
                res.status(403).json({ error });
            }
        })
        .catch(error => res.status(400).json({ error }))
};

exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id})
    .then(post => {
        if (post.userId == req.auth.userId || process.env.ADMIN_ACCOUNT_ID == req.auth.userId) {
            console.log("ctrllrs.post l:71 post: " + post);
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Post.deleteOne({_id: req.params.id})
                .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                .catch(error => res.status(401).json({ error }));
            });
        } else {
            res.status(403).json({message: 'Not authorized'});
        }
    })
    .catch( error => res.status(500).json({ message: "Je trouve pas le post.." }));
 };

exports.getOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
    .then(post => {
        console.log("cntrllrs.posts l:70 post: " + post);
        res.status(200).json(post)
    })
    .catch(error => res.status(404).json({ error }));
};

exports.getAllPosts = (req, res, next) => {
    Post.find()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }))
};

exports.getPostsCountry = (req, res, next) => {
    console.log(req);
    Post.find({ country: req.params.country })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
};

exports.ratingPost = (req, res, next) => {
    const object = req.body;
    console.log("cntrllrs.post l:84 object: " + JSON.stringify(object));

    const ratingHandler = () => {
        if (object.like === 0) {
            Post.findOne({ _id: req.params.id })
            .then(post => {
                if (post.usersLiked.includes(req.auth.userId)) {
                    Post.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.auth.userId }, $inc: { likes: -1 } })
                    .then(newPost => res.status(200).json(newPost))
                    .catch(error => res.status(400).json({ error }));
                }
                if (post.usersDisliked.includes(req.auth.userId)) {
                    Post.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.auth.userId }, $inc: { dislikes: -1 } })
                    .then(newPost => res.status(200).json(newPost))
                    .catch(error => res.status(400).json({ error }));
                }
            })
            .catch(error => res.status(400).json({ error }));
        } else if (object.like === 1) {
            console.log("ctrllrs.post l:120 req.auth: " + JSON.stringify(req.auth));
            Post.updateOne({ _id: req.params.id }, { $push: { usersLiked: req.auth.userId }, $inc: { likes: 1 } })
            .then(post => res.status(200).json(post))
            .catch(error => res.status(400).json({ error }));
        } else if (object.like === -1) {
            Post.updateOne({ _id: req.params.id }, { $push: { usersDisliked: req.auth.userId }, $inc: { dislikes: 1 } })
            .then(post => res.status(200).json(post))
            .catch(error => res.status(400).json({ error }));
        }
    }
    ratingHandler();
}