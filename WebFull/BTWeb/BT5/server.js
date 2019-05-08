const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

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

server.get('/home/reload', (req,res) => {

    fs.readFile('./data.json', (err,data)=>{
        if(err) {
            res.status(500).send('Internet server error');
        }
        
        const question = JSON.parse(data);
        const randomIndex = Math.floor(Math.random()*question.length);
        let randomQuestion = question[randomIndex];

        if(randomQuestion) {
            res.status(200).json(randomQuestion);
        }
        else {
            res.status(200).json({message:'No question'});
        }
    });

    
});

server.get('/get-vote', (req,res) =>{
    console.log(req.query);
    const questionId=req.query.questionId;
    const vote = req.query.vote;
    let questions;

    fs.readFile('./data.json', (err,data) => {
        if(err){
            res.status(500).send('Internet server error!');
        }

        questions = JSON.parse(data);
        if(vote=='yes') {
            questions[Number(questionId)-1].yes+=1;
        }
        else 
            questions[Number(questionId)-1].no+=1;


        if(questions){
         fs.writeFile('./data.json', JSON.stringify(questions), (err,data) => {
            if(err){
                res.status(500).send('Internet server error!');
            }
            res.status(200).json(questions);
        });
      }
      res.status(200).json(questions[Number(questionId)-1]);
    });
    
});

server.get('/get-create', (req,res) => {
    fs.readFile('./data.json' ,(err,data) => {
        if(err) {
            res.status(500).send('Internet server error');
        }

    if(req.query.content){
     const questions=JSON.parse(data);
     questions.push({
        id: questions.length +1,
        content: req.query.content,
        yes:0,
        no:0,
        createAt: new Date().toLocaleDateString(),
    });

    fs.writeFile('./data.json', JSON.stringify(questions) ,(err,data)=>{
        if(err) 
           res.status(500).send('Internet server error');

        res.status(201).end('secuss');
     });
    }
    

    });
});


server.listen(3000,(err)=>{
    if(err) throw err;
    console.log('server listen on port 3000');
});