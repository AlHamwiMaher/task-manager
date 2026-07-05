require('dotenv').config()
const mongoose = require('mongoose')
async function connect(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        return console.log('Connected Successfully')
    }catch (err){
        console.log('Connection Error' + err)
        process.exit(1)
    }
}
module.exports = connect