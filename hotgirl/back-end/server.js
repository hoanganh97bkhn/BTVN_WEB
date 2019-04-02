const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const userRouter = require('./api/users/routes');
const postRouter = require('./api/posts/routes');
const authRouter = require('./api/auth/routes');
const expressSession = require('express-session');

mongoose.connect('mongodb://localhost:27017/hotgirls',(err)=>{
    if(err) throw err;
    console.log('connect success');
    const app = express();
    app.use(express.static('public'));
    app.use(express.static('register'));
    app.use(express.static('create-posts'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false}));
    
//routers
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }));
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/auth', authRouter);

//font-end
//home
app.get('/home',(req,res)=>{
    res.status(200).sendFile(path.resolve(__dirname + '/public/index.html'));
});

//register
app.get('/register',(req,res)=>{
    res.status(200).sendFile(path.resolve(__dirname + '/register/index.html'));
});

//create-post
app.get('/posts',(req,res)=>{
    res.status(200).sendFile(path.resolve(__dirname + '/create-posts/index.html'));
});
// start server
    app.listen(3000,(err)=>{
    if (err) throw err;
    console.log('Server listen to a port 3000');
});
    
});