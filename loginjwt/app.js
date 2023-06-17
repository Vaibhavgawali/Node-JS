const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors=require('cors');
const db=require('./db');
const authController = require('./controller/AuthController')

app.use(cors());
app.get('/',(req,res)=>{
    res.send('Everting ok');
})

app.use('/api/auth',authController)

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})