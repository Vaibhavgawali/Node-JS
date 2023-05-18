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
    try {
        output=await db.collection(colName).find(query).toArray();
    } catch (error) {
        output={error:error.message};
    }
    return  output;
}

async function getDataSort(collName,query,sort){
    try {
        output=await db.collection(collName).find(query).sort(sort).toArray();
    } catch (error) {
        output= {error:"sort limit exceeded"};   
    }
    return output;
}

module.exports={
    dbConnect,getData,getDataSort 
}