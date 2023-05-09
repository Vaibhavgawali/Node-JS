const express=require('express');
const categoryRouter=express.Router();

category_data=[
    {
        "id":1,
        "category": "Fashion",
        "thumb":"https://i.ibb.co/56VP0Fn/cloths.jpg"
    },
    {
        "id":2,
        "category":"Electronics",
        "thumb":"https://i.ibb.co/pw5Wtdx/appliances.jpg"
    },
    {
        "id":3,
        "category":"Essentials",
        "thumb":"https://i.ibb.co/0cw34xm/essentials.jpg"
    },
    {
        "id":4,
        "category": "Footwear",
        "thumb":"https://i.ibb.co/r3SZq8S/footware.jpg"
    }
]

function router(menu){
    categoryRouter.route('/').get((req,res)=>{
        // res.send("Home of category")
        res.render('category',{title:'Category Page',menu,category_data});
    })

    categoryRouter.route('/details').get((req,res)=>{
        res.send('details of category')
    })

    return categoryRouter;
}

module.exports=router;