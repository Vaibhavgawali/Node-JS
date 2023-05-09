const express=require("express");

const productRouter=express.Router();

productRouter.route('/').get((req,res)=>{
    // res.send("Home of product")
    res.render('products',{title:'Product Page'});
})

productRouter.route('/details').get((req,res)=>{
    res.send("Details of product")
})

module.exports = productRouter;