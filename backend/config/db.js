const mongoose = require('mongoose')
async function connect(){

    await mongoose.connect(process.env.MONGO_URI)
    return console.log('Connected Successfully')
    
}
module.exports = connect