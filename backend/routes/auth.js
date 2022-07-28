const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ResultWithContext } = require('express-validator/src/chain');


const JWT_SECRET = 'somethingisaver$ygoodbo#y';


// ROUTE 1: Create a user using: POST "/api/auth/createuser". No login required

router.post('/createuser',[
    body('name').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password').isLength({min: 5}),

], async (req, res)=>{

    // if there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
        // check whether the user with same email exists already
        let user = await User.findOne({email: req.body.email})
        if(user){
            return res.status(400).json({error: "Sorry a user with the same email exists already"})
        }
        
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // creating a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);

        // res.json(user)
        res.json({authtoken});
        
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

// ROUTE 2: Authenticate a user using: POST "/api/auth/login". No login required
router.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),

], async (req, res)=>{

    // if there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({authtoken});

    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

})

// ROUTE 3: Get logged-in user details using: POST "/api/auth/getuser". Login required
router.post('/getuser', async (req, res)=>{
    try {
        let userId = "TODO";
        const user = await User.findById(userId).select("-password")
        
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router
