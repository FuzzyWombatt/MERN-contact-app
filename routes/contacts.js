import  Express from "express";

const contactsRouter = Express.Router();

//@route    GET api/contacts
//@desc     Get all users contacts
//@access   Private
contactsRouter.get('/', (req, res) => {
    res.send('get logged in user');
})

//@route    POST api/contacts
//@desc     Add new contact
//@access   private
contactsRouter.post('/', (req, res) => {
    res.send('add contact')
})

//@route    PUT api/contacts/:id
//@desc     Update contact
//@access   private
contactsRouter.put('/:id', (req, res) => {
    res.send('update contact')
})

//@route    DELETE api/contacts/:id
//@desc     Delete contact
//@access   private
contactsRouter.delete('/:id', (req, res) => {
    res.send('delete contact')
})



export {contactsRouter};