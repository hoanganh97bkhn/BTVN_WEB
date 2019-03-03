const express=require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const server=express();

server.use(express.static('public'));
server.use(express.static('public_page'));
server.use(bodyParser.urlencoded({extended:false}));
server.use(bodyParser.json());

const arrayQuestion = JSON.parse(fs.readFileSync('./data.json','utf-8'));
let question;
let index;

server.get('/home',(req,res) => {
     index=randQuestion();
     question=arrayQuestion[index];
     let htmlSource = fs.readFileSync('./public_page/home-page.html',"utf-8");
     res.status(200).send(htmlSource.replace('{question}', question.content));

});

server.get('/create',(req,res)=>{
    res.status(200).sendFile(path.resolve(__dirname + '/public/create-question.html'));
});

server.post('/create',(req,res)=>{
    //id,content,yes,no, createAt; use create
    //JSON.stringify()

    fs.readFile('./data.json', (err,data)=>{
        if(err) res.status(500).send('Internet server error');

        const questions=JSON.parse(data);
        console.log(typeof questions);

        questions.push({
            id: questions.length,
            content: req.body.content,
            yes:0,
            no:0,
            createAt: new Date().toLocaleDateString(),
        })

        fs.writeFile('./data.json', JSON.stringify(questions) ,(err,data)=>{
            if(err) 
               res.status(500).send('Internet server error');
    
            res.status(201).end('secuss');
    });

    });
    
});

server.post('/home', (req,res)=>{
    if(req.body.btnClick == "yes") {
        res.status(200).send(`yes : ` + `${question.yes +1}`);
        arrayQuestion[index].yes=question.yes + 1;
        fs.writeFileSync('./data.json', JSON.stringify(arrayQuestion));
    }

    if(req.body.btnClick == "no"){
        res.status(200).send(`yes : ` + `${question.no +1}`);
        arrayQuestion[index].no=question.no + 1;
        fs.writeFileSync('./data.json', JSON.stringify(arrayQuestion));
    }

    if(req.body.btnClick == "ketquavote"){
        const yes=question.yes;
        const no=question.no;
        res.status(200).send(`Yes : ${yes/(yes+no)*100}%  No : ${no/(yes+no)*100}%`);
    }

    if(req.body.btnClick == "cauhoikhac"){
        index=randQuestion();
        question=arrayQuestion[index];
        let htmlSource = fs.readFileSync('./public_page/home-page.html',"utf-8");
        res.status(200).send(htmlSource.replace('{question}', question.content));
    }


});

server.listen(3000,(err)=>{
    if(err) throw err;
    console.log('server listen on port 3000');
});

function randQuestion(){
    const temp = Math.floor(Math.random() * (arrayQuestion.length));
    return temp;
}