const express=require('express');
const request= require('request');

const app=express();

const port=9112;

// midlleware
app.use(express.static(__dirname+'/public'));
app.set('views','./src/views');
app.set('view engine', 'ejs');

app.get('/weather',(req,res)=>{
    city = req.query.city?req.query.city:'Hingoli';
    let url =`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;
    
    request(url,(err,data)=>{
        if(err) throw err;
        let output=JSON.parse(data.body);
        res.render('index',{title:"Weather",result:output});
    })
})

app.listen(port,err=>{
    if(err) throw err;
    console.log(`Server is running on port ${port}`);
});