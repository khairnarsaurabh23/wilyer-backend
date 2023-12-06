const express = require('express')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const app = express();

//reaD IN coming req.body 
app.use(bodyParser.json())


const log = (req,res,next)=>{
    console.log(`${req.method} request received at route ${req.url}`);
    next();
}


app.get('/', log, (req,res, next)=>{
    const token = jwt.sign({foo:"data"},'something');
    res.status(200).json({message:'Welcome to the auth app',token});
    next();
})

//this route verifies the token coming from front-end in the  request body
app.post('/login', log, (req,res,next)=>{
    jwt.verify(req.body.token, 'something', (err,data)=>{
        if(err){
            res.status(401).json({message:"lofin again"});
            next();
        }
        res.status(200).json({message:"login successfull"});
        next();
    })
})

app.listen(5000, ()=>{
    console.log(`backend started at port 3000`);
})