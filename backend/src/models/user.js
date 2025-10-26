const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    mail: String,
    password: String,
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
  }
})

module.exports = mongoose.model('User', userSchema);