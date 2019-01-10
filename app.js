const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.json())

app.use(morgan('short'));

const router = require('./routes/user.js');
app.use(router);

//test
app.get('/', (req, res)=>{
  console.log("REsponding to root route")
  res.send('hello ')
});

//localhost:3003
app.listen(3003, () =>{
  console.log("Server is up and listening on 3003...")
});