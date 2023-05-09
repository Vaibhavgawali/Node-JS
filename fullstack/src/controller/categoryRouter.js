const express=require('express');
const categoryRouter=express.Router()

categoryRouter.route('/').get((req,res)=>{
    res.send("Home of category")
})

categoryRouter.route('/details').get((req,res)=>{
    res.send('details of category')
})

module.exports=categoryRouter;