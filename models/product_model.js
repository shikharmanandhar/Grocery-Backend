const mongoose= require("mongoose");


const Product=mongoose.model("Product",{
    pName:{
        type:String
    },
    pPrice:{
        type:String
    },
    pPmage:{
        type:String
    }
})
module.exports = Product