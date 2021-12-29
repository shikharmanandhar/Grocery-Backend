const express= require("express");
const router= new express.Router();
const Product = require("../models/product_model");
const uploadimg=require("../file/fileupload");
const auth= require("../auth/auth")



router.post("/product/insert",auth.verifyVendor,function(req,res){
    const pName= req.body.pName;
    const pPrice=req.body.pPrice;
    const pDescription=req.body.pDescription;
    // const pQuantity=req.body.pQuantity;
    const vendorId= req.vendorInfo._id;

    const data= new Product({
        pName : pName,
        pPrice : pPrice,
        pDescription : pDescription,
        // pQuantity : pQuantity,
        vendorId : vendorId,
    })
    data.save()
    .then(
        function(){
            res.json({message:"Product Inserted!"})
        }
    ).catch(function(){
        res.json({message:"Something went wrong"})
    })

})


router.put('/product/update', auth.verifyVendor,function(req,res){
const pid=req.body.pid;
const pName= req.body.pName;
    const pPrice=req.body.pPrice;
    const pDescription=req.body.pDescription;
    // const pQuantity=req.body.pQuantity;
    
  Product.updateOne({_id:pid},{pName:pName,pPrice:pPrice,pDescription:pDescription})
  .then(
    function(){
        res.json({message:"Product updated!"})
    }
  )
  .catch(
    function(){
        res.json({message:"something went wrong!"})
    }
  )  
})



module.exports=router;
