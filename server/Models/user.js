const mongoose = require('mongoose');

//user schema
const userSchema = mongoose.Schema({
    username:
    {
        type: String
    },
    email:
    {
        type: String,
        unique: true
    },
    password:
    {
        type: String,
        min: 8
    },
    otp:
    {
        type : String,
        createdAt: { type: Date, expires: '30m', default: Date.now },
    },
    createdAt:
    {
        type: Date,
        default: Date.now()
    },
});
//user Model
module.exports = mongoose.model('users', userSchema);