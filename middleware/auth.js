import Jwt from "jsonwebtoken";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const data = require("../config/default.json");
//exporting as default anymous function
export default (req, res, next) => {
    const token = req.header('x-auth-token');

    //check if not token 
    if(!token){
        return res.status(401).json({msg: 'No token, authorization denied'})
    }

    try {
        const decoded = Jwt.verify(token, data.jwtsecret)

        req.user = decoded.user;
        next();
    } catch (err) {
        return res.status(401).json({msg: 'invalid token'})
    }

}