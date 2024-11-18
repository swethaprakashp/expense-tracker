const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {v4:uuidv4} = require('uuid');

const UserSchema = new mongoose.Schema({
    userId : {type : String, default : uuidv4, unique : true},
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true}
});
//hash password before saving to db
UserSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified('password')) return next();
    user.password = await bcrypt.hash(user.password, 10);
    next();
});

module.exports = mongoose.model('userModel', UserSchema)