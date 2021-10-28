import Express from "express";
import { User } from "../models/User.js";

const usersRouter = Express.Router();

//@route    POST api/user
//@desc     Register a user
//@access   Public
usersRouter.post('/', (req, res) => {
    res.send(req.body)
})

export {usersRouter};