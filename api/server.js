// BUILD YOUR SERVER HERE
const express = require('express');
const server = express();
const User = require('./users/model')

server.post('/api/users', async (req,res,newUser)=>{
    const  users = await User.insert(newUser);
    res.status(201).json(users);
})

server.get('/',
  (require, respond) => {
    respond.send('hello there, express welcomes you.');
  });

server.get('/api/users', async (require, respond) => {
    const users = await User.find();
    respond.status(200).json(users);
  });




module.exports = server; // EXPORT YOUR SERVER instead of {}
