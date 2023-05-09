const express=require("express");

const productRouter=express.Router();

function router(menu){
    productRouter.route('/').get((req,res)=>{
        // res.send("Home of product")
        res.render('products',{title:'Product Page',menu});
    })

    productRouter.route('/details').get((req,res)=>{
        res.send("Details of product")
    })

    return productRouter;
}

module.exports = router;