import {Schema, model} from "mongoose";
import validator from "validator";

const userSchema = new Schema({
    name: {type: String, required: [true, 'Please provide name'], minLength: 3, maxLength: 20, trim: true},
    email: {type: String, required: [true, 'Please provide email'], unique: true, validate: {
          validator: validator.isEmail,
            message: 'Please provide a valid email'
        }},
    password: {type: String, required: [true, 'Please provide password'], minLength: 6},
    lastName: {type: String, default: 'lastName'},
    location: {type: String, default: 'my city'},
})

export default model('User', userSchema)
