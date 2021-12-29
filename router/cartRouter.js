const express = require("express");
const router = new express.Router();
const auth= require("../auth/auth");
const Cart = require("../models/cart_model");

router.post("/cart/add",auth.verifyVendor,function(req,res){
    const pName= req.body.pName;
    const pPrice=req.body.pPrice;
    const pDescription=req.body.pDescription;
    const pQuantity=req.body.pQuantity;
    const customerId= req.customerId._id;
    const items= req.body.items;

    const data= new Product({
        pName : pName,
        pPrice : pPrice,
        pDescription : pDescription,
        pQuantity : pQuantity,
        customerId : customerId,
        items=items
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



module.exports = router;



