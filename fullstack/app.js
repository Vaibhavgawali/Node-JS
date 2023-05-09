const express = require("express");

const productRouter=require('./src/controller/productRouter');
const categoryRouter = require("./src/controller/categoryRouter");

const port=8112;
const app = express();

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.use('/product',productRouter)
app.use('/category',categoryRouter)

app.listen(port,(err)=>{
    if(err) throw err;
    console.log("Listening on port "+ port + " ...");
})