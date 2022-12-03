import User from "../models/User.js";
import {StatusCodes} from 'http-status-codes'
import {BadRequestError} from "../errors/index.js";



export const register = async(req, res) => {
    const {name, email, password} = req.body
    if (!name || !email || !password){
        throw new BadRequestError('please provide all values')
    }
    const userAlreadyExists = await User.findOne({email})
    if (userAlreadyExists){
        throw new BadRequestError('Email already in use')
    }
       const user = new User(req.body)
       await user.save()
       res.status(StatusCodes.CREATED).json({user})

}
export const login = async(req, res) => {
    res.send('login')
}
export const updateUser = async(req, res) => {
    res.send('updateUser')
}


