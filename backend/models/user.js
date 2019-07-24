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
    },    image: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image'
        }
    },
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        }
    }, 
    image: String, 
 
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);
module.exports = User;