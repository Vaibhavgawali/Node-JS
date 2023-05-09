const express=require('express');
const categoryRouter=express.Router();

function router(menu){
    categoryRouter.route('/').get((req,res)=>{
        // res.send("Home of category")
        res.render('category',{title:'Category Page',menu});
    })

    categoryRouter.route('/details').get((req,res)=>{
        res.send('details of category')
    })

    return categoryRouter;
}

module.exports=router;