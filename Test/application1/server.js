const express = require('express');
const bodyParse = require('body-parser');
const path = require('path');
const server = express();

server.use(express.static(__dirname + '/public'));

server.get('/home', (req,res) => {
    res.status(200).send('hello world');
})

server.listen(3000, (err)=>{
    if( err) throw err;
    console.log('Listen to port 3000')
})