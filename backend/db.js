const mongoose = require("mongoose")
require("dotenv").config()
const connectToDB  = async ()=>{
    try{
       

        await mongoose.connect('mongodb+srv://practiceDB:vinay@cluster0.dsem2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&readPreference=secondaryPreferred')
        console.log("connected to db")
        // mongodb+srv://practiceDB:<db_password>@cluster0.dsem2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    }catch(err){
        console.log("err in connecting db", err)
    }
} 

// mongodb+srv://practiceDB:vinay@cluster0.dsem2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
module.exports = connectToDB;