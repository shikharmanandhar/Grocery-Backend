const mongoose= require("mongoose");

const Product=new mongoose.Schema({
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
    // pImage:{ 
    //     type:String
    // },
    // pQuantity:{
    //     type:Number
    // },
    vendorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor"
    }
})

module.exports = mongoose.model('Product', Product)