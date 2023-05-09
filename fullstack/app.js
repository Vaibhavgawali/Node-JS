const express = require("express");

const productRouter=require('./src/controller/productRouter');
const categoryRouter = require("./src/controller/categoryRouter");

const port=8112;
const app = express();

// middleware 
app.use(express.static(__dirname+'/public'));
app.set('views','./src/views');
app.set('view engine','ejs');

app.get("/",(req,res)=>{
    // res.send("Hello World");
    // res.render('mypage',{name:"Vaibhav Gawali"});
    res.render('index',{title:"Home Page"})
})

app.use('/product',productRouter)
app.use('/category',categoryRouter)

app.listen(port,(err)=>{
    if(err) throw err;
    console.log("Listening on port "+ port + " ...");
})