import  Express from "express";

const authRouter = Express.Router();

//@route    GET api/auth
//@desc     Get logged in user
//@access   Private
authRouter.get('/', (req, res) => {
    res.send('get logged in user');
})

//@route    POST api/auth
//@desc     Auth user and get token
//@access   Public
authRouter.post('/', (req, res) => {
    res.send('registers a user')
})


export {authRouter};