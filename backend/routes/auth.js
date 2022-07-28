const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');



// Create a user using: POST "/api/auth/createuser". Doesn't require auth

router.post('/createuser',[
    body('name').isLength({min: 3}),
    body('email').isEmail(),
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
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        
        // .then(user => res.json(user))
        // .catch(err=> {console.log(err)
        // res.json({error: 'please enter a unique value for email', message: err.message })});
        res.json(user)
        
    }catch(error){
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})

module.exports = router
