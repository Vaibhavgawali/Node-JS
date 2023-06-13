const express = require('express');
const app=express()
const port = process.env.PORT || 7710;

// mongodb connection setup
const mongo=require("mongodb")
const {MongoClient} = require("mongodb");
// const url="mongodb://127.0.0.1";
const url="mongodb+srv://admin:gy2TtDMKuT1Wz6o3@cluster0.b50rznn.mongodb.net/?retryWrites=true&w=majority";

const client=new MongoClient(url);
async function main() {
    await client.connect();
}
const collection = client.db("dash_user").collection("users");

// swagger setup
const swaggerUi=require("swagger-ui-express")
const swaggerDocument=require('./swagger.json')
const package=require('./package.json')
swaggerDocument.info.version=package.versionl;
app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(swaggerDocument))

// bodyparser and cors
const bodyParser = require("body-parser");
const cors= require("cors");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

// ejs setup
app.use(express.static(__dirname + "/public"));
app.set("views","./src/views");
app.set("view engine","ejs");

app.get("/health",(req,res)=>{
    res.send("Health Ok");
})

app.post('/addUser',async (req,res)=>{
    let data=req.body;
    await collection.insertOne(data);
    res.send("data inserted")
})

app.get('/users',async(req,res)=>{
    const output=[]
    let query={}
    if(req.query.city && req.query.role){
        query={
            role:req.query.role,
            city:req.query.city,
            isActive:true
        }
    }else if(req.query.city){
        query={
            city:req.query.city,
            isActive:true
        }
    }else if(req.query.role){
        query={
            role:req.query.role,
            isActive:true
        }
    }else if(req.query.isActive){
        let isActive=req.query.isActive;
        if(isActive == "true"){
            isActive=true
        }else{
            isActive=false
        }
        query={isActive}
    }else{
        query={isActive:true}
    }
    const cursor =collection.find(query)
    for await(const data of cursor){
        output.push(data)
    }
    cursor.closed;
    res.send(output)
})

app.get('/user/:id',async(req,res)=>{
    let id=req.params.id;
    const output=[]
    let query={_id:new mongo.ObjectId(id)}
    const cursor=collection.find(query)
    for await(let data of cursor){
        output.push(data)
    }
    cursor.closed;
    res.send(output) 
})

app.put('/updateUser',async(req,res)=>{
    await collection.updateOne(
        {_id:new mongo.ObjectId(req.body._id)},
        {
            $set:{
                name:req.body.name,
                city:req.body.city,
                phone:req.body.phone,
                role:req.body.role,
                isActive:true
            }
        }
    )
    res.send("updated successfully")
})

// Hard delete user
app.delete('/deleteUser',async(req,res)=>{
    await collection.deleteOne({_id:new mongo.ObjectId(req.body._id)})
    res.send("User deleted")
})

// Soft delete user (deactivate)
app.put('/deactivateUser',async(req,res)=>{
    await collection.updateOne(
        {_id:new mongo.ObjectId(req.body._id)},
        {
            $set:{
                isActive:false
            }
        }
    )
    res.send("user deactivated")
})

// Activate user
app.put('/activateUser',async(req,res)=>{
    await collection.updateOne(
        {_id:new mongo.ObjectId(req.body._id)},
        {
            $set:{
                isActive:true
            }
        }
    )
    res.send("user activated")
})

app.listen(port, ()=>{
    main();
    console.log(`listening on port ${port}`)
})