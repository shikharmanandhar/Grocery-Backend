const mongoose= require("mongoose");


const Vendor=mongoose.model("Vendor",{
    username:{
        type:String
    },
    password:{
        type:String
    },
    usertype:{
        type:String
    },
    vimage:{
        type:String
    }
})
module.exports = Vendor