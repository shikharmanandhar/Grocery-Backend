const express = require("express");
const bcryptjs = require("bcryptjs");
const router = new express.Router();
const Customer = require("../models/customer_model");
const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt= require("jsonwebtoken");
const { application } = require("express");

const {appendFile}=require("fs");
const auth= require("../auth/auth")




router.post("/customer/register", function (req, res) {
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



// login route for customer
router.post("/customer/login",function(req,res){
    const username=req.body.username;
    Customer.findOne({
        username:username
    })
    .then(function(customerData){

        if(customerData===null){
            return res.json({
                message:"Not Registered"
            })
        }
        //here the code goes for comparing pws
        const password=req.body.password;
        bcrypt.compare(password,customerData.password,function(e, result){
            //console.log(result);
            if (result===false){
                return res.json({message:"Invalid"})
            }
            //now lets genereate token
            //jsonwebtoken
            const token=jwt.sign({custId:customerData._id}, "anysecretkey");
            res.json({token:token, message:"sucess"});
        })
        
        // console.log(customerData);
        // return res.json({message:"Not registered",a:"apple", b:"ball"})
        // //now its time for comparing password between the password provided by client and password stored in db

        // const password= req.body.password;
        
        // bcryptjs.compare("password",customerData.password,function(e, result){
        //     console.log.(result)
        // })

    })
})


router.delete("/test",auth.verifyCustomer,function(req,res){
    res.json({msg:"deleted"})
})

router.get("/profile", auth.verifyCustomer,function(req,res){
    Customer.findOne({_id:req.customerInfo._id})
})

router.put("/update",auth.verifyCustomer,function(req,res){
    
})

module.exports = router;




