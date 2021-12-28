const mongoose= require("mongoose");



const Product=new mongoose.Schema("Product",{
    pName:{
        type:String,
        required: true
    },
    pPrice:{
        type:String,
        required:true
    },
    pDescription:{
        type:String
    },
    pImage:{
        type:String
    },
    pQuantigy:{
        type:Number
    },
    vendorId:{
        type:String
    }
})
module.exports = Product