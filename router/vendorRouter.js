const bcryptjs = require("bcryptjs");
const express= require("express");
const router= new express.Router();
const Vendor = require("../models/vendor_model");
const bcrypt= require("bcryptjs/dist/bcrypt");
const jwt= require("jsonwebtoken");

const {appendFile}=require("fs");
const auth= require("../auth/auth")


router.post("/vendor/register", function(req,res){
    const username = req.body.username;
    
    Vendor.findOne({username:username})
    .then(function(vendorData){
        if(vendorData != null){
            res.json({
                message:"Vendor Already Exists!"
            })
            return;
        }
        //now this place is for the user which is not available in dbs
        const password= req.body.password;
        const usertype= req.body.usertype;

        bcryptjs.hash(password,10,function(e, hashed_value){
            const data= new Vendor({
                username:username,
                password:hashed_value,
                usertype: usertype,
            })
            data.save()
            .then(function(){
                res.json({ message:"Vendor Registered Sucessfully"})
            })
                .catch(function(e){
                    res.json(e)
                })
            })
        });

    })



//login route for vendor
router.post("/vendor/login",function(req,res){
    const username= req.body.username;
    Vendor.findOne({
        username:username
    })
    .then(function(vendorData){
        if(vendorData===null){
            return res.json({
                message:"Not registered"
            })
        }
        //here the code goes for comparing pws
        const password=req.body.password;
        bcrypt.compare(password,vendorData.password,function(e,result){
            if(result===false){
                return res.json({message:"username or password incorrect"})
            }
            //now lets generate token
            //jsonwebtoken
            const token =jwt.sign({vendorId:vendorData._id},"anysecretkey");
            res.json({
                token:token, message:"sucess"
            });
        })
    })
})

router.delete("/testvendor",auth.verifyVendor,function(req,res){
    res.json({msg:"deleted"})
})

module.exports=router;