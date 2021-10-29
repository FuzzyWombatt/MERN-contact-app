//if this works why?????? doesn't work in Users model
import { SchemaTypes, Schema, model } from 'mongoose';

/*
import mongoose from 'mongoose';
const {SchemaTypes, Schema, model} = mongoose
*/

//Scema is a class object, therfore needs a constructor new to be used
const ContactSchema = new Schema({
    user:{
        //alias for Schema.Types.ObjectId
        type: SchemaTypes.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    type: {
        type: String,
        deault: 'personal'
    },
    date: {
        type: Date,
        default: Date.now
    },
})

const Contact = model('contact', ContactSchema);

export {Contact}