const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    username: {
        type: String
    },
    profilePicture: {
        type: String,
        default: "",
      },
    followers: {
        type: Array,
        default: [],
    },
      followings: {
        type: Array,
        default: [],
    },
    college: {
        type: String,
        max: 50,
    },
    education:{
        type: String,
        default:""
    },
    experience:{
        type: String,
        default: ""
    },
    bio:{
        type: String,
        default:""
    }
},
{ timestamps: true }
)

module.exports = mongoose.model("User", userSchema);