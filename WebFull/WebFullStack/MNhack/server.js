const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const GameModel = require('./model/game.models.js')

mongoose.connect('mongodb://localhost:27017/minihack', (err) =>{
    if(err) throw err;
    console.log('connect to mongoDB success');
});
const server = express();
server.use(express.static('public'));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.get('/', (req,res)=>{
    res.status(200).sendFile(path.resolve(__dirname, './public/html/create-html.html'))
});



server.post('/api/game', async(req,res)=>{
try{
    const {player}=req.body;
    const newGame = await GameModel.create({
        players : player,
        socres : [],
    });
    res.status(201).json(newGame);
}
catch(error){
    res.status(error.status || 500).end
}
});

server.listen(3000,(err)=>{
    if (err) throw err;
    console.log('listen to port 3000')
})