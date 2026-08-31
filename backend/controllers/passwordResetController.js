const PasswordReset = require('../models/PasswordReset')
const transporter = require('../config/mailer')
const User = require('../models/User')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')

async function forgetPassword(req , res ,next) {
    
    const email = req.body.email 
    const isUserExist = await User.findOne({email}).select('-password -username')
    if (!isUserExist)
        return res.status(200).json({message : 'if an account with this email exists, then the reset password link is already sent'})
    const id = isUserExist._id
     await PasswordReset.findOneAndDelete({userId : id})

    const rawToken = crypto.randomBytes(32).toString('hex')
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex')

    const expiresAt = new Date(Date.now() + 900000)

    const newAttempt = {
        hashedToken : tokenHash ,
        userId : id ,
        expiresAt
    }
     await PasswordReset.create(newAttempt)
    const resetURL = `http://localhost:5173/resetpassword?token=${rawToken}`
    await transporter.sendMail({
        from : process.env.GMAIL_USER ,
        to : isUserExist.email ,
        subject : 'Reset Your Password' ,
        html : `
        <div style=" display: flex; flex-direction : column; align-items: center; justify-content : center; background-color : black; color : white;">
        <h2>Password Reset</h2>
        <p>You requested a password reset</p>
        <a href="${resetURL}" style=" padding: 10px 20px;"> Reset Password</a>
        <p>This link will be expired in 15 minutes</p>
        </div>
        `
    })
    return res.status(200).json({
    message: 'If an account with this email exists, a reset link has been sent'})
}

async function resetPassword(req , res , next) {

    const rawToken = req.query.token
    const newPassword = req.body.newPassword
    if (typeof newPassword !== "string" || newPassword.trim().length < 8) return res.status(400).json({message : 'Password must be at least 8 characters'})
    const newPasswordTrim = newPassword.trim()
    if (typeof rawToken !== "string" || rawToken.length !== 64) return res.status(400).json({message : 'Invalid access, request a new reset link'})
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex')
    const tokenDocument = await PasswordReset.findOne({hashedToken : tokenHash})
    if (!tokenDocument) return res.status(400).json({message : 'Bad Request, go and request a new reset link'})
    const dateNow = new Date(Date.now())
    if (dateNow > tokenDocument.expiresAt) return res.status(400).json({message : 'the link is expired, request a new one'})
    const hashedNewPassword = await bcrypt.hash(newPasswordTrim , 10)
    await User.findByIdAndUpdate(tokenDocument.userId , {password : hashedNewPassword})
    await PasswordReset.findByIdAndDelete(tokenDocument._id)
    return res.status(200).json({message : 'Password updated successfully'})

}

async function checkTokenValidity(req , res , next) {
    const token = req.query.token
    if (typeof token !== "string" || token.length !== 64) return res.status(400).json({message : 'Invalid access, request a new reset link'})
    const hashedToken =   crypto.createHash('sha256').update(token).digest('hex')
    const tokenDoc = await PasswordReset.findOne({hashedToken})
    if (!tokenDoc) return res.status(400).json({message : 'Expired Link, Request a new one'})
    if (Date.now() > tokenDoc.expiresAt.getTime()) return res.status(400).json({message : 'Expired Link, Request a new one'})
    return res.status(200).json({message : 'Token exists and it is valid'})

}
module.exports = {forgetPassword , resetPassword , checkTokenValidity}