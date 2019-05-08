const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const questionModel = require('./model');

mongoose.connect('mongodb://localhost:27017/hala', (err) => {
    if(err){
        throw err;
    }
    console.log('Connect to Mongodb success');

    const server = express();

server.use(express.static('public_Create'));
server.use(express.static('public'));
server.use(bodyParser.urlencoded({extended:false}));
server.use(bodyParser.json());


server.get('/home', (req,res) => {
    res.status(200).sendFile(path.resolve(__dirname + '/public/home.html'));
    
});

server.get('/create', (req,res) => {
    res.status(200).sendFile(path.resolve(__dirname + '/public_Create/create-question.html'));
});

server.get('/get-create',async (req,res) => {
    const newQuestion = {
        content : req.query.content,
    };

    const result = await questionModel.create(newQuestion);
    console.log(result);

    res.status(200).json({
        id: result._id,
    });
});


server.get('/get-vote', (req,res) =>{
    console.log(req.query);
    const questionId=req.query.questionId;
    const vote = req.query.vote;
    questionModel.findById(questionId, (err, result) =>{
        if (err) throw err;

        if(vote == 'yes') {
                questionModel.findByIdAndUpdate( questionId, {yes : result.yes +1}, (err,result1) =>{
                    if (err) throw err;
                    res.status(200).json(result1);
                });
        }
        else 
            {
                questionModel.findByIdAndUpdate( questionId, {no : result.no +1}, (err,result1) =>{
                    if (err) throw err;
                    res.status(200).json(result1);
                });
            } 
        });
});

server.get('/home/reload', (req,res) => {
    questionModel.find({} , (err, result) =>{
        if(err) throw err;
        else {
            const index = Math.floor(Math.random() * result.length) ;
            res.status(200).json(result[index]);
        }
    });
    
});

server.listen(3000,(err)=>{
    if(err) throw err;
    console.log('server listen on port 3000');
});

});

