const mongoose= require("mongoose");


const Customer=mongoose.model("Customer",{
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    usertype:{
        type:String
    },
    contact:{
        type:String
    },
    address:{
        type:String
    },
    uimage:{
        type:String
    }
})
module.exports = Customer