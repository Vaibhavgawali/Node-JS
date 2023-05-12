import express from 'express';
import request from 'request';

const app=express();
const port=process.env.PORT || 9112;

// midlleware
app.use(express.static(__dirname+'/public'));
app.set('views','./src/views');
app.set('view engine', 'ejs');

app.get('/weather',(req,res)=>{
    let city_name = req.query.city ? req.query.city : 'Pune';
    let url =`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city_name}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;
    
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