const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
let bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "Harshaisagood$boy";

router.post('/createUser', [
    body('email', 'Please enter a valid email').exists(),
    body('name', 'Please enter your name').exists(),
    body('password', 'Enter a password minimum of 5 characters').isLength( {min: 5} )
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.json({errors: errors.array()});
    }

    try {
        // check whether the user already exists
        let user = await User.findOne({email: req.body.email});
        if(user) {
            return res.json({success: false, error: "Sorry a user with this email already exists"});
        }

        const salt = await bcrypt.genSalt(10)
        const securedPassword = await bcrypt.hash(req.body.password, salt);

        // Creating a new user
        user = await User.create({
            name: req.body.name,
            password: securedPassword,
            email: req.body.email
        })

        // Creating a authentication token for the user and sending it back to the client side
        const data = {
            id: user.id
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(authToken);
        res.json({success:true, authToken: authToken})
        console.log({success:true, authToken: authToken})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

router.post('/login', [
    body('email', 'Please enter a valid email').exists(),
    body('password', 'Enter a password minimum of 5 characters').isLength( {min: 5} )
], async (req, res) => {
    //errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.json({success: false, errors: errors.array()});
    }

    const {email, password} = req.body;
    try {
        const user = await User.findOne({email: email});
        if(!user) {
            return res.json({success: false, errors:"Provide correct credentials"});
        }
        else {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if(!passwordMatch) {
                return res.json({success: false, errors:"Provide correct credentials"});
            }
        }
        
        // Create Token
        const data = {
            id: user.id
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(authToken);
        res.json({success:true, authToken: authToken})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }

})

router.get('/getUser', fetchuser, async (req, res) => {
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.json({success: true, user});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})


module.exports = router