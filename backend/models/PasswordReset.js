const mongoose = require('mongoose')
const PasswordSchema = new mongoose.Schema({
    hashedToken : String ,
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User',
        required : true
    },
    expiresAt : {
        type : Date ,
        index : {expires : 0}
    }
})
const PasswordReset = mongoose.model('PasswordReset' , PasswordSchema)
module.exports = PasswordReset