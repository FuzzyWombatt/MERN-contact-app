import  Express from "express";

const usersRouter = Express.Router();

//@route    POST api/user
//@desc     Register a user
//@access   Public
usersRouter.post('/', (req, res) => {
    res.send('registers a user')
})

export {usersRouter};