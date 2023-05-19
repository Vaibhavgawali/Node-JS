const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongo=require("mongodb")

const dotenv = require("dotenv")
dotenv.config()

const app = express()
const port = process.env.PORT;
const { dbConnect, getData ,getDataSort,getDataSortLimit,postData,updateData,deleteData} = require("./src/controller/dbController")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Ok")
})

// list of city
app.get('/location', async (req, res) => {
    let collName = 'location'
    let query = {}
    let city = await getData(collName, query);
    res.send(city);
})

// list of restaurant
app.get('/restaurants', async (req, res) => {
    let collName = 'RestaurantData'
    let query = {}
    let stateId = Number(req.query.stateId);
    let mealId = Number(req.query.mealId);

    if (stateId && mealId) {
        query = { 
                    state_id: stateId , 
                    "mealTypes.mealtype_id":mealId
                }
    } else if (stateId) {
        query = { 
                    state_id: stateId 
                }
    } else if (mealId) {
        query = { 
                    "mealTypes.mealtype_id":mealId 
                }
    }

    let reastaurant = await getData(collName, query);
    res.send(reastaurant);
})

// list of meals
app.get('/meals', async (req, res) => {
    let collName = 'mealtypes'
    let query = {}
    let meal = await getData(collName, query);
    res.send(meal)
})

// filters
app.get('/filters/:mealId', async (req, res) => {
    let query = {}
    let collName = 'RestaurantData'
    let mealId = Number(req.params.mealId)
    let cuisineId = Number(req.query.cuisineId)
    let lcost = Number(req.query.lcost)
    let hcost = Number(req.query.hcost)
    let skip=0;
    let limit=1000000;

    let sort={cost:1};
    if(req.query.sort){
        sort ={cost: req.query.sort}
    }

    if(req.query.skip&&req.query.limit){
        skip =Number(req.query.skip)
        limit =Number(req.query.limit)
    }
    
    if(cuisineId){
        query = {
                    "mealTypes.mealtype_id":mealId,
                    "cuisines.cuisine_id": cuisineId
                }
    }else if(lcost && hcost){
        query = {
                    "mealTypes.mealtype_id":mealId,
                    $and: [{cost:{$gt:lcost,$lt:hcost}}]
                }
    }else{
        query = {
                    "mealTypes.mealtype_id":mealId
                }
    }
    let output = await getDataSortLimit(collName,query,sort,skip,limit);
    res.send(output);
})

// details of restaurants
app.get('/details/:id',async (req,res)=>{
    let id = mongo.ObjectId(req.params.id);
    let collection="RestaurantData"
    let query={_id:id};
    let output = await getData(collection,query);
    res.send(output);
})

// menu wrt reastaurants
app.get('/menu/:id',async (req,res)=>{
    let id = Number(req.params.id);
    const collection="RestaurantMenu"
    const query={restaurant_id:id}
    let output = await getData(collection,query);
    res.send(output);
})

// orders
app.get('/orders',async(req,res)=>{
    let query = {};
    if(req.query.email){
        query={email:req.query.email};
    }
    let collection = "orders";
    let output = await getData(collection,query);
    res.send(output);
})

// place order
app.post('/placeOrder',async(req,res)=>{
    let data = req.body;
    let collection = "orders";
    let output=await postData(collection,data);
    res.send(output);
})

// menu details {id:[1,5,3]}
app.post('/menuDetails',async(req, res)=>{
    if(Array.isArray(req.body.id)){
        let query = {menu_id:{$in:req.body.id}};
        let collection="RestaurantMenu"
        let output = await getData(collection,query);
        res.send(output);
    }else{
        res.send('Please pass data as an array like {id:[1,5,3]}');
    }
})

// update order
app.put('/updateOrder',async(req,res)=>{
    let collection= "orders"
    let condition ={"_id": mongo.ObjectId(req.body._id)};
    let data={
        $set:{"status":req.body.status}
    }
    let output = await updateData(collection,condition,data);
    res.send(output);
})

// delete order
app.delete('/deleteOrder',async(req,res)=>{
    let collection= "orders"
    let query ={"_id": mongo.ObjectId(req.body._id)}
    let data=await getData(collection,query);
    if(data.length>0){
        let output = await deleteData(collection,query);
        res.send(output);
    }else{
        res.send('Data not found')
    }
})

app.listen(port, (err) => {
    if (err) throw err
    dbConnect();
    console.log(`listening on port ${port}`)
})