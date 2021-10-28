import mongoose from 'mongoose';

//list destructure since not all appear to be named exports
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

const User = model('user', UserSchema);

export {User}