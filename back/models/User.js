const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// const userSchema = mongoose.Schema({
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true},
//     pseudo: { type: String, required: true, unique: true },
//     age: { type: String, required: true },
//     gender: { type: String, required: true},
//     country: { type: String, required: true },
//     profilePicture: { type: String, required: false },
// });
const albumSchema = mongoose.Schema({
    name: { type: String, required: false },
    pictures: { type: [String], required: false }
})

const previousTripSchema = mongoose.Schema({
    destination: { type: String, required: false },
    year: { type: Number, required: false },
    duration: { type: String, required: false },
    withWho: { type: String, required: false },
    details: { type: String, required: false },
})

const userAuthentificationSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
})

const userDataSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    country: { type: String, required: true },
})

const userProfileSchema = mongoose.Schema({
    pseudo: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    dreamTrips: { type: [String], default: undefined, required: true },
    previousTrips: [previousTripSchema],
})

const userSchema = mongoose.Schema({
    userAuth: userAuthentificationSchema,
    userData: userDataSchema,
    userProfile: userProfileSchema,
    profilePicture: { type: String, required: false },
    albums: [albumSchema],
})

// userAuthentificationSchema.plugin(uniqueValidator);
// userProfileSchema.plugin(uniqueValidator);
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
