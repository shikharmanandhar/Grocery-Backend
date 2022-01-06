const express= require("express");
const cors=require("cors");

const app= express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))


require("./database/database");

const CustomerRoute=require("./router/customerRouter");
const VendorRoute=require("./router/vendorRouter");
const ProductRoute=require("./router/productRouter")
app.use(CustomerRoute,VendorRoute,ProductRoute);




app.listen("90");