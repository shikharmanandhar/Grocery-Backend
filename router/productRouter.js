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


router.delete('/product/delete', auth.verifyVendor, function(req,res){
    const pid=req.body.pid;
    const vendorId=req.vendorInfo._id;

    Product.deleteOne({pid:pid,vendorId:vendorId})
    .then(
        function(){
            res.json({message:"Product Deleted"})
        }
    )
    .catch(function(){
        res.json({message:"something went wrong!"})
    })
})


//to view all the products
// no login required
router.get('/product/all', function(req,res){
    Product.find()
    .then(function(result){
        res.json(result)
    })
    .catch(function(){
        res.json({
            message:"something went wrong ok"
        }
        )
    })
})

//to view products of only one vendor
router.get('/product/vendorall',auth.verifyVendor,function(req,res){
    const vendorId=req.vendorInfo._id;

    Product.find(
        {
            vendorId:vendorId
        }
    )
    .then(function(result){
        res.json(result)
    })
    .catch(function(){
        res.json({message:"someting went wrong"})
    })
})


module.exports=router;
