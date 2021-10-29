import Express from "express";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

import { User } from "../models/User.js";

//ugly way to import from the config, but must be done if using type:module
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const data = require("../config/default.json");

const authRouter = Express.Router();

//@route    GET api/auth
//@desc     Get logged in user
//@access   Private
authRouter.get("/", (req, res) => {
  res.send("get logged in user");
});

//@route    POST api/auth
//@desc     Auth user and get token
//@access   Public
authRouter.post(
  "/",
  [
    check("email", "Please enter an email").isEmail(),
    check("password", "Password required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body;

    try{
        let user = await User.findOne({email});
            
        if(!user){
            return res.status(400).json({msg: 'Invalid credentials'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({msg: 'Invalid credentials'})
        }

        Jwt.sign(payload, data.jwtsecret, {
            expiresIn: 360000
        }, 
        (err, token) => {
            if(err){
                throw err;
            } 
            res.json({token});
        })
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
  }
);

export { authRouter };
