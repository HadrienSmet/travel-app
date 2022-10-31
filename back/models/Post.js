const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    pseudo: { type: String, required: true },
    profilePicture: { type: String, required: true },
    text: { type: String, required: false },
    imageUrl: { type: String, required: false },
    date: { type: Number, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String], default: [] },
    usersDisliked: { type: [String], default: [] }
});

// sauceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Post', postSchema);