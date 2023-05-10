const MongoClient=require('mongodb').MongoClient;
const url='mongodb://127.0.0.1:27017';
let db;

function dbConnect(){
    MongoClient.connect(url,{useNewUrlParser:true},function(err,client){
        if(err){
            res.status(500).send("error while connecting");
        }
        else{
            db=client.db('maymorning');
        }
    })    
}

async function getData(colName,query){
    return  await db.collection(colName).find(query).toArray();
}

module.exports={
    dbConnect,
    getData
};
