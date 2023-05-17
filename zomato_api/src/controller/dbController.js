const mongo =require('mongodb').MongoClient;
const mongoUrl= process.env.MongoUrl;
let db;

function dbConnect(){
    mongo.connect(mongoUrl,{useNewUrlParser:true},(err,client)=>{
        if (err) throw err;
        db=client.db('zomato')
    })
}

async function getData(colName,query){
    return  await db.collection(colName).find(query).toArray();
}

module.exports={
    dbConnect,getData 
}