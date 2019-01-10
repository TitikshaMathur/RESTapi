//user realted routes

const express = require('express');
const mysql = require('mysql');
const router = express.Router();

//test router
router.get('/messages',(req, res) =>{
    console.log('show messages')
    res.end();
})

//Fetching all user
router.get('/user',(req, res) => {
    console.log('fetching all users')
  
    const queryString = "select * from users;"     
    getConnection().query(queryString,(err, rows, fields) => {
      if(err)
      {
        console.log("Failed to query"+ err)//throw error
        return
      }
            
      const users = rows.map((row) =>{
        return{UserId: row.user_id, Name: row.name, Email: row.email}
      });
      
      res.json(rows)
    });

  });


//fetching specific user by id
router.get('/user/:id',(req, res) => {
    console.log('fetching user with id:'+ req.params.id)
     
    const userID = req.params.id
    const queryString = "select * from users where user_id = ?;"     
    getConnection().query(queryString,[userID],(err, rows, fields) => {
      if(err) {
        console.log("Failed to query"+ err)//throw error
        return
      }
            
      const users = rows.map((row) =>{
        return{UserId: row.user_id, Name: row.name, Email: row.email}
      });
      
      res.json(rows)
    });

  });

//Create new user
router.post('/user_create',(req, res) => {
    console.log('creating new user')
     
    const userName = req.body.name
    const emailID = req.body.email
    const queryString = "insert into users(name, email) values(?, ?);"     
    getConnection().query(queryString,[userName, emailID],(err, results, fields) => {
      if(err) {
        console.log("Failed to query"+ err)//throw error
        return
      }           
      console.log("inserted new user with id",results.insertId)
      });
      
  });

  function getConnection(){
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'newroot',
        database: 'test'
      });
}
    
module.exports = router;