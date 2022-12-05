import {Schema, model} from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    name: {type: String, required: [true, 'Please provide name'], minLength: 3, maxLength: 20, trim: true},
    email: {type: String, required: [true, 'Please provide email'], unique: true, validate: {
          validator: validator.isEmail,
            message: 'Please provide a valid email'
        }},
    password: {type: String, required: [true, 'Please provide password'], minLength: 6, select: false},
    lastName: {type: String, default: 'lastName'},
    location: {type: String, default: 'my city'},
})

userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

})

userSchema.methods.createJWT = function () {
    return jwt.sign({userId: this._id}, process.env.JWT, {expiresIn: '1d'})
}
userSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

export default model('User', userSchema)
