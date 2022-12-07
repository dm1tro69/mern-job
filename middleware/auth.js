import {UnauthenticatedError} from "../errors/index.js";
import jwt from "jsonwebtoken";


export const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token){
        throw new UnauthenticatedError('Authentication Invalid')
    }
    try {
        const payload = jwt.verify(token, process.env.JWT)

        req.user = {userId:payload.userId}

        next()
    }catch (e) {
       throw new UnauthenticatedError('Authentication Invalid')
    }

}
