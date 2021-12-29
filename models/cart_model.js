const mongoose= require("mongoose");

const Cart=new mongoose.Schema({
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    items:[{
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        qty:{
            type: Number,
            required: true,
            default: 1
        }
        
        
    }],
    total:{
        type:Number,
        
    },
    
    isActive:{
        type:Boolean,
        default:true
    }


    
})

module.exports = mongoose.model('Cart', Cart)