const express = require('express');
const UserModel = require('../users/models')
const authRouter = express();
const bcryptjs = require('bcryptjs');

//register
authRouter.post('/register', async(req,res)=>{
    try{
        const userInfo = req.body;
        const existEmail = await UserModel.findOne({
            email : req.body.email
        }).exec();

        if(existEmail) {
            res.status(200).json({
                message : 'email used',
                success : false
            });
        }
        else {
            const hashPassword = await bcryptjs.hash(userInfo.password, 10);
        const newUser = await UserModel.create({
            ...userInfo,
            password: hashPassword,
            permissions : 'POST.CREATE'
        });
        res.status(201).json({newUser});
        }
        
    }
    catch(error)
    {
        res.status(500).end(error.message);
    }
})
//login
authRouter.post('/login', async(req,res)=>{
    try{
        const loginInfo = req.body;
        //check emai,password empty
        const user = await UserModel.findOne({email : loginInfo.email}).exec();

        if(!user){
            res.status(200).json({
                message : 'User not found',
                success : false
            });
        }
        else {
            const comparePassword = await bcryptjs.compare(loginInfo.password,user.password);
            if(comparePassword) {
                //success
                //save session storage

                req.session.user = {
                    _id: user._id,
                    lastName : user.lastName,
                    firstName : user.firstName,
                    email : user.email,
                    permissions : user.permissions,
                };
                req.session.save();

                res.status(200).json({
                    message : 'Login success',
                    success : true
                });

            }
            else{
                //failed
                res.status(200).json({
                    message : 'Password isnt correct',
                    success : false
                });
            }
        }
    }
    catch(error){
        res.status(500).end(error.message);
    }
});
authRouter.get('/test', (req,res)=>{
    console.log(req.session);
    res.status(201).end();
})
//logout
authRouter.get('/logout', async(req,res)=>{
    try{
        req.session.destroy();
        res.status(200).json({
            message : 'Log out success',
            success : true
        })
    }catch(error){
        res.status.json(error.message)
    }
});

module.exports = authRouter;