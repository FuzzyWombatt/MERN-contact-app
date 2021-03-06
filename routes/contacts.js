import Express from "express";
import { check, validationResult } from "express-validator";

import { Contact } from "../models/Contact.js";
import { User } from "../models/User.js";
import auth from "../middleware/auth.js";

const contactsRouter = Express.Router();

//@route    GET api/contacts
//@desc     Get all users contacts
//@access   Private
contactsRouter.get("/", auth, async (req, res) => {
  try {
    //sort -1 brings back most recent first
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
});

//@route    POST api/contacts
//@desc     Add new contact
//@access   private
contactsRouter.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {name, email, phone, type} = req.body;

    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        })

        const contact = await newContact.save();
        res.json(contact)
    } catch (err) {
        console.error(err);
        res.status(500).send("server error");
    }
  }
);

//@route    PUT api/contacts/:id
//@desc     Update contact
//@access   private
contactsRouter.put("/:id",auth,async (req, res) => {
  const {name, email, phone, type} = req.body;

  const contactFields = {};
  if(name) contactFields.name = name;
  if(email) contactFields.email = email;
  if(phone) contactFields.phone = phone;
  if(type) contactFields.type = type;

  try {
      let contact = await contact.findById(req.params.id)

      if(!contact) return res.status(404).json({msg: 'Contact not found'});

      if(contact.user.toString() !== req.user.id){
          return res.status(401).json({msg: 'not authorized'})
      }

      contact = await Contact.findByIdAndUpdate(req.params.id, 
        {$set: contactFields},
        {new: true})

        res.json(contact)
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
});

//@route    DELETE api/contacts/:id
//@desc     Delete contact
//@access   private
contactsRouter.delete("/:id",auth, async (req, res) => {
    try {
        let contact = await contact.findById(req.params.id)
  
        if(!contact) return res.status(404).json({msg: 'Contact not found'});
  
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'not authorized'})
        }
  
        contact = await Contact.findByIdAndRemove(req.params.id)
  
        res.json({msg: 'Contact removed'})
    } catch (err) {
      console.error(err);
      res.status(500).send("server error");
    }
});

export { contactsRouter };
