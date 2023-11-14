const mongoose = require('mongoose')
const {Schema, model} = mongoose;

const UserSchema = new Schema({
    userName: {type: String, required: true, min: 4, unique: true},
    email: {type: String, required: true, uniuqe: true},
    password: {type:String, min: 8,  required: true},
    role: {type: String, enum: ["Admin", "User"], default: "User"}
});
const UserModel = model('User', UserSchema)

module.exports = UserModel