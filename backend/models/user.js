const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        index: true,
        dropDups: true,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String, 
        required: true
    },
 
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);
module.exports = User;