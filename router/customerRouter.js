const express = require("express");
const bcryptjs = require("bcryptjs");
const router = new express.Router();
const Customer = require("../models/customer_model");
const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt= require("jsonwebtoken");
const { application } = require("express");

const {appendFile, rmSync}=require("fs");
const auth= require("../auth/auth");
const uploadimg=require("../file/fileupload");
const sendemail=require("../email");




router.post("/customer/register" , uploadimg.single('uimage'), function (req, res) {
    // if(req.file==undefined){
    //     return res.json({msg:"invalid!!!!!!"})
    // }
    
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
            const email= req.body.email;
            const password = req.body.password;
            const usertype = req.body.usertype;
            const contact = req.body.contact;
            const address = req.body.address;
        

            bcryptjs.hash(password, 10, function (e, hashed_value) {
                const data = new Customer({
                    username: username,
                    email:email,
                    password: hashed_value,
                    usertype: usertype,
                    contact: contact,
                    address: address,
                    // uimage:req.file.filename
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
            //jwt.sign helps to create token- 
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

router.post("/customer/passGenLink", function(req, res) {
    const email = req.body.email;
    const newPass = req.body.newPass;
    //confirm password
    Customer.findOne({email: email}).then(function(customerData) {
        if(customerData==null) {
            return res.json({message: "Customer with that email address does not exist."});
        }
        const token = jwt.sign({custId: customerData._id}, "resetPassKey", {expiresIn: "5m"});
        const link = `localhost:90/customer/resetPass/${token}/${newPass}`;
        sendemail(email, "Password Reset Link", link);
        res.json({message: link});
    });
});
router.put("/customer/resetPass/:resetToken/:newPass", function(req, res) {
    try{
        const token = req.params.resetToken;
        const customerData = jwt.verify(token, "resetPassKey");          
        // console.log("entered"); 
        bcryptjs.hash(req.params.newPass, 10, (e, hashed_pass)=> {           
            // console.log("entered bcryptjs"); 
            Customer.updateOne({_id: customerData.custId}, {password: hashed_pass})
            .then(function() {
                res.json({message: "Your password has been reset."})
            })
            .catch(function(e) {
                res.json({error: e});
            });
        });        
    }
    catch(e) {
        res.json({error: e});
    }
});




router.get("/profile", auth.verifyCustomer,function(req,res){
    Customer.findOne({_id:req.customerInfo._id})
})

router.put("/update",auth.verifyCustomer,function(req,res){
    
})

//profile update of the customer
router.put("/customer/profile/update", auth.verifyCustomer,function(req,res){
    // console.log(req.customerInfo._id);
    // console.log(req.customerInfo.contact);
    // res.json(req.customerInfo);
    const cid=req.customerInfo._id;
    const contact= req.body.contact;
    Customer.updateOne({_id:cid},{contact:contact})
    .then(function(){
        res.json({msg:"Profile update"})
    })
    .catch(function(){
        res.json({msg:"something went wrong"})
    });
})

// to delete customer by itsself
router.delete("/customer/profile/delete",auth.verifyCustomer,function(req,res){
    const cid=req.customerInfo._id;
    Customer.findByIdAndDelete(cid)
    .then(function(){
        res.json({msg:"Customer deleted"})
    })
    .catch(function(){
        res.json({msg:"something went wrong! Try again"});
    })
})


// to delete customer by admin
// router.delete("/customer/profile/admin/delete",auth.verifyAdmin,function(req,res){
//     const cid=req.body.id;
//     Customer.deleteOne({_id:cid})
//     .then()
//     .catch()
    
// })

router.post("/product/imgupload",uploadimg.single('myimages'),function(req,res){
if(req.file==undefined){
    return res.json({msg:"invalid!!!!!!!"})
}
})


module.exports = router;




