const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Contacts = require("../models/Contacts");
const fetchuser = require("../middleware/fetchuser");

router.post(
  "/addContact",
  fetchuser,
  [
    body("name").exists(),
    body("email").isEmail(),
    body("phnumber").isLength({ min: 10, max: 10 }),
    body("address").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({errors: errors.array() });
    }

    try {
      const { name, email, phnumber, address } = await req.body;
      const contact = new Contacts({
        name,
        email,
        phnumber,
        address,
        user: req.user.id,
      });
      const savedContact = await contact.save();
      res.json({savedContact});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

router.get("/getContacts", fetchuser, async (req, res) => {
  try {
    const contacts = await Contacts.find({ user: req.user.id });
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Some error occured");
  }
});

router.delete("/deleteContact/:id", fetchuser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({errors: errors.array() });
  }

  try {
    let contact = await Contacts.findById(req.params.id);
    if (!contact) {
      return res.status(404).send("Not Found");
    }
    //Checking for owner of the contact
    if (String(contact.user) !== req.user.id) {
      return res.status(401).json({errors:"Unauthorized access"});
    }
    contact = await Contacts.findByIdAndDelete(req.params.id);
    res.json({"Job done": "The node has been deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

router.put("/updateNote/:id", fetchuser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({errors: errors.array() });
  }

  try {
    let contact = await Contacts.findById(req.params.id);
    if (!contact) {
      return res.status(404).send("Not Found");
    }
    //Checking for owner of the contact
    if (String(contact.user) !== req.user.id) {
      return res.status(401).send({errors: "Unauthorized access"});
    }

    const { name, email, phnumber, address } = req.body;
    const newContact = {};
    if (name) {
      newContact.name = name;
    }
    if (email) {
      newContact.email = email;
    }
    if (phnumber) {
      newContact.phnumber = phnumber;
    }
    if (address) {
      newContact.address = address;
    }

    contact = await Contacts.findByIdAndUpdate(
      req.params.id,
      { $set: newContact },
      { new: true }
    );
    res.json({contact});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

module.exports = router;
