const express= require("express");
const router= new express.Router();
const Vendor = require("../models/vendor_model");

const uploadimg=require("../file/fileupload")


router.post("/customer/register" , uploadimg.single('uimage'), function (req, res) {
    if(req.file==undefined){
        return res.json({msg:"invalid!!!!!!"})
    }
    
    const username = req.body.username;

    Customer.findOne({ username: username })
        .then(function (customerData) {
            if (customerData != null) {
                res.json({
                    message: "User Already Exists!"
                })
                return;
            }
            
            //now this place is for the user which is not availabel in db

            const password = req.body.password;
            const usertype = req.body.usertype;
            const contact = req.body.contact;
            const address = req.body.address;
        

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