const express=require('express');
const redis=require('redis');
const axios=require('axios');

const app=express();
const port=8112;

let client=redis.createClient({
    host:'localhost',
    port:'6379'
})

app.get('/data',(req,res)=>{
    let userInput=req.query.country.trim();
    userInput=userInput?userInput:'India';
    const url=`https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userInput}`;

    // check data in redis
    return client.get(userInput,(err,result)=>{
        if(result){
            const output=JSON.parse(result);
            res.send(output)
        }else{
            axios.get(url)
            .then((response)=>{
                const output=response.data;
                // save the response in redis for naxt time
                client.setex(userInput,3600,JSON.stringify({source:"Redis Cache",output}))
                // return data for first time
                res.send({source:"API Response",output}) 
            })
        }
    })
})

app.listen(port,(err)=>{
    if(err) throw err
    console.log(`listening on port ${port}`)
})