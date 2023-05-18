const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const dotenv = require("dotenv")
dotenv.config()

const app = express()
const port = process.env.PORT;
const { dbConnect, getData ,getDataSort} = require("./src/controller/dbController")

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

    let sort={cost:1};
    if(req.query.sort){
        sort ={cost: req.query.sort}
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
    let output = await getDataSort(collName,query,sort);
    res.send(output);
})


app.listen(port, (err) => {
    if (err) throw err
    dbConnect();
    console.log(`listening on port ${port}`)
})