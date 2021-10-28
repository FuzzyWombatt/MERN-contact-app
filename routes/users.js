import Express from "express";
import { Users } from "../models/Users.js";

const usersRouter = Express.Router();
const user = Users;

//@route    POST api/user
//@desc     Register a user
//@access   Public
usersRouter.post('/', (req, res) => {
    res.send('registers a user')
})

export {usersRouter};