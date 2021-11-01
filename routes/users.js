import Express from "express";
import bcrypt from 'bcryptjs'
import  Jwt  from "jsonwebtoken";
import { check, validationResult } from "express-validator";

import { User } from "../models/User.js";


//ugly way to import from the config, but must be done if using type:module
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const data = require("../config/default.json");

const usersRouter = Express.Router();
//formatted using prettier
//@route    POST api/user
//@desc     Register a user
//@access   Public
usersRouter.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "please include a valid email").isEmail(),
    check("password","choose a password that is 6 or more characters").isLength({min: 6}),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        //400 error is bad request
        return res.status(400).json({errors: errors.array()})
    }

    const {name, email, password} = req.body;

    try{
        //local scope
        let user = await User.findOne({email});
            
        if(user){
            return res.status(400).json({msg: 'User already exists'})
        }

        user = new User({
            name,
            email,
            password
        });
        //salt is used to strengthen and hash a password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }
        
        Jwt.sign(payload, data.jwtsecret, {
            //don't forget to change when deployed. 
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

    res.send('success')
  }
);

export { usersRouter };
