const express=require("express");
const app=express();
const port=process.env.PORT || 9112;
const superagent=require("superagent")
const request=require("request")

const cors=require("cors")
app.use(cors());

app.get("/",(req,res)=>{
    res.send('<a href="https://github.com/login/oauth/authorize?client_id=6471043abe90c96d3ad0">Login with Git</a>')
})

app.get("/profile",(req,res)=>{
    const code=req.query.code;
    if (!code){
        res.send({
            success:false,
            message:"code is required"
        })
    }
    // res.send(code)
    superagent
    .post('https://github.com/login/oauth/access_token')
    .send({
        client_id:'6471043abe90c96d3ad0',
        client_secret:'2b4a859da60be8d00c2ecfd4372fdc4d76b8a561',
        code:code
    })
    .set('Accept', 'application/json')
    .end((err,result)=>{
        if(err) throw err;
        let access_token=result.body.access_token;

        const option={
            uri:'https://api.github.com/user',
            method:'GET',
            headers:{
                'Accept': 'application/json',
                'Authorization': `Bearer ${access_token}`,
                'User-Agent': 'mycode'
            }
        }
        request(option,(err,response,body)=>{
            res.send(body)
        })
    })
})

app.listen(port,()=>{
    console.log(`listening on ${port}`)
})