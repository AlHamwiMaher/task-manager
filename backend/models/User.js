const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 15
    },
    email: {
        type : String,
         required : true,
         unique : true,
         match : [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    password: {
        type : String,
        required : true,
        minlength : 8,
        validate : {
            validator : function(value){
                return /[a-z]/.test(value) && /[A-Z]/.test(value) && /[0-9]/.test(value)
            },
            message : 'password must contain uppercase, lowercase, and a number'
        }
    }
})
const User = mongoose.model('User', userSchema);
module.exports = User
