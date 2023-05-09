const express = require("express");
const port=8112;
const app = express();

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.get("/student",(req,res)=>{
    res.send("Hello Student");
})

app.listen(port,(err)=>{
    if(err) throw err;
    console.log("Listening on port "+ port + " ...");
})