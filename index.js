const express  = require('express');

const port = 9000;

const app = express();

const path = require('path');

app.set('view engine','ejs');

const db = require('./config/mongoose');

app.use('/uploads',express.static(path.join(__dirname,'uploads')))

app.use('/',require('./routes'));   

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("server is start on port :- "+port);
})
