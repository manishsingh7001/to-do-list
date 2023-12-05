const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    email:String,
    name:String,
    phone_no:Number,
    password:String,
    address:String
});



const UsersModal = mongoose.model("users", UserSchema);

module.exports = UsersModal;
