const mongoose = require('mongoose');

const UserSchema = mongoose.Schema ({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: ""
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String
    },
    favourites: [mongoose.Schema.Types.ObjectId]
}, {timestamps: true})

UserSchema.statics.verifyId = function (id, req, res) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("The Id Provided Is Not Valid");
    }
};

module.exports = mongoose.model("User", UserSchema);