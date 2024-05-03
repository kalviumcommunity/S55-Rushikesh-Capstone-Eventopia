const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: String,
    email: String,
    password: String
});
const userModel = mongoose.model('credential', userSchema);
module.exports = {userModel};
