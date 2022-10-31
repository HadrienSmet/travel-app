const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    pseudo: { type: String, required: true, unique: true },
    age: { type: String, required: true },
    gender: { type: String, required: true},
    country: { type: String, required: true },
    profilePicture: { type: String, required: false }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
