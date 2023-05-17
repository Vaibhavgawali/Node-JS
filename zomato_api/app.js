const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const dotenv = require("dotenv")
dotenv.config()

const app = express()
const port = process.env.PORT;
const { dbConnect, getData } = require("./src/controller/dbController")

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
    } if (mealId) {
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
    let collName = 'RestaurantData'
    let mealId = Number(req.params.mealId)
    let cuisineId = Number(req.query.cuisineId)
    let query = {"mealTypes.mealtype_id":mealId}
    if(cuisineId){
        let query = {
                        "mealTypes.mealtype_id":mealId,
                        "cuisines.cuisine_id": cuisineId
                    }
    }
    let output = await getData(collName,query);
    res.send(output);
})

app.listen(port, (err) => {
    if (err) throw err
    dbConnect();
    console.log(`listening on port ${port}`)
})