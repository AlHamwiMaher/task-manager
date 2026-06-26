const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
router.post ('/register' , async (req,res) =>{
    const name = req.body.username
    const email = req.body.email
    const password = req.body.password
    const hashsedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({username : name , email: email , password: hashsedPassword})
    await newUser.save()
    res.status(201).json({message : "Created Successfully"})
})

router.post ('/login' , async (req,res) =>{
    const userEmail = req.body.email
    const userPassword = req.body.password
    const savedUserDocument = await User.findOne({email : userEmail })
    if (savedUserDocument !== null){
        const isMatch = await bcrypt.compare(userPassword, savedUserDocument.password)
        if (isMatch){
            const token = jwt.sign(
                {id: savedUserDocument.id},
                process.env.JWT_SECRET,
                {expiresIn : '7d'}
            )
            res.status(200).json(token)
        }else{
            res.status(401).json({message : "Unauthorized Access"})
        }

    }else{
        res.status(404)
    }
})
module.exports = router