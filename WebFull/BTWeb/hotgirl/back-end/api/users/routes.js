const express = require('express');
const UserModel = require('./models');
const userRouter = express();

userRouter.post('/',async (req,res)=>{
    //create user
    try {
        //check email
        const email = req.body.email;
        const existEmail = await UserModel.findOne({
            email : req.body.email
        }).exec();
        if(existEmail) {
            res.status(403).end('email has been used');
        }

        const userInfo = req.body;
        const newUser = await UserModel.create(userInfo);
        
        res.status(201).json(newUser);
    }
    catch(error){
        res.status(500).end(error.message);
    }
});
userRouter.get('/test',async (req,res)=>{
    
});

module.exports = userRouter;