const mongoose = require("mongoose");


const uri = "mongodb+srv://ranjana:3esAY2PwscfcHAMk@glampingapi.ktx34.mongodb.net/SSO-test-Api?retryWrites=true&w=majority&appName=GlampingApi";

const connectDb = () => {
    console.log("connected database" , )
    return mongoose.connect(uri)
    
    
};

module.exports = connectDb