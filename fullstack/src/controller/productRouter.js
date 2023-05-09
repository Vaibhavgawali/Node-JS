const express=require("express");

const productRouter=express.Router();

productRouter.route('/').get((req,res)=>{
    res.send("Home of product")
})

productRouter.route('/details').get((req,res)=>{
    res.send("Details of product")
})

module.exports = productRouter;