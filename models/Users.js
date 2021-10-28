import mongoose from 'mongoose';

//list destructure to get out what I need from mongoose
const {Schema, model} = mongoose
//Scema is a class object, therfore needs a constructor new to be used
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
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
    date: {
        type: Date,
        default: Date.now
    },
})
//don't use new down here
const user = model('user', UserSchema);

export {user}