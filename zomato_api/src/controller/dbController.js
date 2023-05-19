const { query } = require('express');

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

async function getDataSortLimit(collName,query,sort,skip,limit){
    try {
        output=await db.collection(collName).find(query).sort(sort).skip(skip).limit(limit).toArray();
    } catch (error) {
        output= {error:"invalid condition in getDataSortLimit"};   
    }
    return output;
}

async function postData(colName,data){
    try {
        output=await db.collection(colName).insertOne(data);
    } catch (error) {
        output={error:error.message};
    }
    return  output;
}

async function updateData(colName,condition,data){
    try {
        output=await db.collection(colName).update(condition,data);
    } catch (error) {
        output={error:error.message};
    }
    return  output;
}

async function deleteData(colName,query){
    try {
        output=await db.collection(colName).remove(query);
    } catch (error) {
        output={error:error.message};
    }
    return  output;
}

module.exports={
    dbConnect,getData,getDataSort,getDataSortLimit,postData,updateData,deleteData 
}