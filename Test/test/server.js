const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const server = express();

server.use(express.static('public'));
server.use(bodyParser.urlencoded({extended:false}));
server.use(bodyParser.json());


server.get('/home', (req,res) => {
    res.status(200).sendFile(path.resolve(__dirname + '/public/index.html'));
});
server.get('/api/test', (req,res)=>{
    res.status(200).json({message : 'hello thang ngu'});
})


server.listen(3000,(err)=>{
    if(err) throw err;
    console.log('server listen on port 3000');
});