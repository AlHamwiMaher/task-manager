const User = require('../models/User')
const bcrypt = require('bcryptjs')
const Task = require('../models/Task')
const jwt = require('jsonwebtoken')

async function registerUser(req , res , next) {
    const name = req.body.username
    const email = req.body.email
    const password = req.body.password
    
    if (typeof name =="string" && name.trim().length !== 0){
        if (typeof email =="string" && email.trim().length !== 0){
            if (typeof password =="string" && password.trim().length !== 0){
                const hashsedPassword = await bcrypt.hash(password, 10)
                const newUser = new User({username : name , email: email , password: hashsedPassword})
                await newUser.save()
                return res.status(201).json({message : "Created Successfully"})
            }else{
                return res.status(400).json({message : 'Enter Valid Password'}) 
            }
        }else{
            return res.status(400).json({message : 'Enter Valid Email'})           
        }
    }else{
        return res.status(400).json({message : 'Enter Valid Name'})
    }
}

async function loginUser(req , res ,next) {
    const userEmail = req.body.email
    const userPassword = req.body.password
    if (typeof userEmail == "string" && userEmail.trim().length !== 0){
        if (typeof userPassword == "string" && userPassword.trim().length !== 0){
            const savedUserDocument = await User.findOne({email : userEmail })
            if (savedUserDocument !== null){
                const isMatch = await bcrypt.compare(userPassword, savedUserDocument.password)
                if (isMatch){
                    const token = jwt.sign(
                    {id: savedUserDocument.id},
                    process.env.JWT_SECRET,
                    {expiresIn : '7d'}
                    )
                    return res.status(200).json({'token' : token})
                }else{
                    return res.status(401).json({message : "Invalid Credentials"})
                }

            }else{
                return res.status(404).json({message : 'Invalid Credentials'})
            }
        }else{
           return res.status(400).json({message : 'Enter a valid password'})            
        }
    }else{
        return res.status(400).json({message : 'Enter a valid email'})
    }
    
}

async function changePassword(req , res , next) {
    const userId = req.user.id
    const oldPassword = req.body.oldPassword
    const userDocument = await User.findById(userId)
    const isMaching = await bcrypt.compare(oldPassword , userDocument.password )
    if (isMaching){
        const newPassword = req.body.newPassword.trim()
        if (oldPassword !== newPassword){
            if (newPassword.length >= 8){
                const hashsedPassword = await bcrypt.hash(newPassword , 10)
                const saveUpdate = await User.findByIdAndUpdate(userId , {password : hashsedPassword})
                if (saveUpdate){
                    return res.status(200).json({message : 'Password Updated Successfully'})
                }else{
                    res.status(400).json({message : 'Something went Wrong'})
                }
            }else{
                return res.status(400).json({message : 'Invalid new Password'})
            }
        }else{
            return res.status(400).json({message : 'Invalid new Password'})
        }
    
    }
    return res.status(400).json({message : 'Invalid Request'})
    
}

async function deleteAccount(req , res ,next) {

    const userId = req.user.id
    const userPassword = req.body.password.trim()
    const userDocument = await User.findById(userId)
    const isMaching = await bcrypt.compare(userPassword , userDocument.password)
    if (isMaching){
        const deleteTask = await Task.deleteMany({owner : userId})
        const deleteUser = await User.findByIdAndDelete(userId)
        if (deleteUser){
            return res.status(200).json({message : 'Deleted Successfully'})
        }else{
            return res.status(400).json({message : 'Something Went Wrong, Try Again'})
        }
            
        }
        return res.status(400).json({message : 'Password Incorrect'})
    }

async function fetchDocument(req , res ,next) {
    const userId = req.user.id
    const userDocument = await User.findById(userId).select('-password')
    if (userDocument){
        return res.status(200).json(userDocument)
    }
    return res.status(404).json({message : 'Not Found'})
}


module.exports ={registerUser , loginUser ,changePassword , deleteAccount , fetchDocument}