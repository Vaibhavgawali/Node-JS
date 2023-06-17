const express=require('express');
const router=express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User=require('../model/userSchema');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

// register user
router.post('/register',(req,res)=>{
    let hashpassword=bcrypt.hashSync(req.body.password,8)
    User.create({
        name: req.body.name,
        email: req.body.email,
        phone:req.body.phone,
        password: hashpassword,
        role: req.body.role?req.body.role:'User'
    },(err,result)=>{
        if(err) return res.status(500).send("There is problem in registration")
        res.status(200).send('Registration successful')
    })
})

// login user
router.get('/login',(req,res)=>{
    User.findOne({ email: req.body.email},(err,user)=>{
        if(err) return res.status(500).send({auth:false,token:'problem with login'})
        if(!user) return res.status(500).send({auth:false,token:'User not found'})
        else{
            const passValid=bcrypt.compareSync(req.body.password,user.password)
            if(!passValid) return res.status(401).send({auth:false,token:'Invalid password'})
            const token =jwt.sign({id:user._id},config.secret,{expiresIn:86400})
            res.status(200).send({auth:true,token:token}) 
        }
    })
}) 

// user info
router.get('/userInfo',(req,res)=>{
    let token = req.headers['x-access-token'];
    if(!token) return res.status(500).send({auth:false,token:'No token provided'})
    jwt.verify(token,config.secret,(err,data)=>{
        if (err) return res.status(500).send({auth:false,token:'Invalid token'})
        User.findById(data.id,(err,user)=>{
            if(err) return res.status(500).send({auth:false,token:'No user found'})
            res.json(user)
        })
    })
})

// all users
router.get('/users',(req,res)=>{
    User.find({},(err,user)=>{
        if(err) throw err;
        res.send(user);
    })
})

module.exports = router;