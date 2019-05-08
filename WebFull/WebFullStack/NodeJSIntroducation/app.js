//file system
const fs= require('fs');
//write file
// fs.writeFile("message.txt","hello world", (err) =>{
//     if(err) throw err;
//     console.log('the file has been saved!');
// });

// console.log('hihi');

//read file

// fs.readFile('message.txt', (err, data) =>{
//     if(err) throw err;
//     console.log(data.toString());
// });

//readdir
// fs.readdir('/home/thispc/BTVN_WEB',(err,files)=>{
//   if(err) throw err;
//   console.log(files);
// });

// fs.unlink('message.txt',(err)=>{
//     if(err) throw err;
//     console.log('xong roi')
// });

// fs.watchFile("message.txt",(curr,prev)=>{
//     console.log(`the current mtime is: ${curr.mtime}`);
//     console.log(`the previos mtime was' ${prev.mtime}`);
// })

//path
const path=require('path');
console.log(path.dirname('/home/thispc/BTVN_WEB'));