const mongoose= require("mongoose");


const Customer=mongoose.model("Customer",{
    username:{
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
    }
})
module.exports = Customer