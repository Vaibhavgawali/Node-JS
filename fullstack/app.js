const express = require("express");
const {dbConnect}=require('./src/controller/dbController');

const port=8112;
const app = express();

menu=[
        {link:'/',name:'Home'},
        {link:'/product',name:'Product'},
        {link:'/category',name:'Category'}
    ]

const productRouter=require('./src/controller/productRouter')(menu);
const categoryRouter = require("./src/controller/categoryRouter")(menu);

// middleware 
app.use(express.static(__dirname+'/public'));
app.set('views','./src/views');
app.set('view engine','ejs');

app.get("/",(req,res)=>{
    // res.send("Hello World");
    // res.render('mypage',{name:"Vaibhav Gawali"});
    res.render('index',{title:"Home Page",menu})
})

app.use('/product',productRouter)
app.use('/category',categoryRouter)

app.listen(port,(err)=>{
    if(err) throw err;
    dbConnect();
    console.log("Listening on port "+ port + " ...");
})