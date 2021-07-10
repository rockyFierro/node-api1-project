// BUILD YOUR SERVER HERE
const express = require('express');
const server = express();
const User = require('./users/model')

server.use(express.json());

// GET ALL FROM '/'
server.get('/',
  (request, response) => {
    response.status(200).json({ message: 'hello' })
  });

// GET ALL USERS FROM '/users'
server.get('/api/users',
  (request, response) => {
    User.find()
      .then(users => {
        response.status(200).json(users);
      })
      .catch(error => {
        response.status(500).json({
          message: "something has gone terribly wrong: ",
          error: error.message,
          stack: error.stack
        });
      });
  });

// GET SPECIFIC FROM '/users/:id'
server.get('/api/users/:id',
  (request, response) => {
    User.findById(request.params.id)
      .then(user => {
        user.id === request.params.id ?
        response.status(200).json(user) :
        response.status(400).json({message:'bad request, please check Uri spelling.'})
      })
      .catch(error => {
        response.status(404).json({
          message: "The user with the specified ID does not exist.",
          error: error.message,
          stack: error.stack,
          status:error.status
        });
      });
  });

  

  server.get('*',
  (request, response)=>{
    response.status(404).json({
      message: 'does not exist'
    });
  });

module.exports = server;
