const jwt = require("jsonwebtoken");
const Customer= require("../models/customer_model")
const Vendor=require("../models/vendor_model")


//guard for customer
module.exports.verifyCustomer=function(req,res,next){
    try{
    const token=req.headers.authorization.split(" ")[1];
    // console.log(token);
    const cdata=jwt.verify(token,"anysecretkey");
    Customer.findOne({_id: cdata.custId}).then(function(custData){
        // console.log(custData);
        req.customerInfo=custData;
        next();

    })
    .catch(function(e){
        res.json({error:e})
    })
}
catch(e){
    res.json({error:e})
}
}



//guard for vendor
module.exports.verifyVendor=function(req,res,next){
    try{
    const token=req.headers.authorization.split(" ")[1];
    // console.log(token);
    const cdata=jwt.verify(token,"anysecretkey");
    Vendor.findOne({_id: vdata.vendorId}).then(function(venData){
        // console.log(custData);
        req.vendorInfo=venData;
        next();

    })
    .catch(function(e){
        res.json({error:e})
    })
}
catch(e){
    res.json({error:e})
}
}



