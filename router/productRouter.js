const express= require("express");
const router= new express.Router();
const Vendor = require("../models/vendor_model");

const uploadimg=require("../file/fileupload")


router.post("/product/add" , uploadimg.single('uimage'), function (req, res) {
    if(req.file==undefined){
        return res.json({msg:"invalid!!!!!!"})
    }
    
    const pName = req.body.pName;

    Produxt.findOne({ pName: pName })
        .then(function (productData) {
            if (productData != null) {
                res.json({
                    message: "Product Already Exists!"
                })
                return;
            }
            
            //now this place is for the user which is not availabel in db

            const pPrice = req.body.pPrice;
            const pDescription = req.body.pDescription;
            const pImage = req.body.pImage;
            
        

            bcryptjs.hash(password, 10, function (e, hashed_value) {
                const data = new Customer({
                    username: username,
                    password: hashed_value,
                    usertype: usertype,
                    contact: contact,
                    address: address,
                    uimage:req.file.filename
                })
                data.save()
                    .then(function () {
                        res.json({ message: "Registered Success" });

                    })
                    .catch(function (e) {
                        res.json(e)
                    })
            });

        })
})