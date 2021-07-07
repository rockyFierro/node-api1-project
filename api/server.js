// BUILD YOUR SERVER HERE
const express = require('express');
const users = require('./users/model');
const server = express();


server.get('/',
  (require, respond) => {
    respond.send('hello there, express welcomes you.');
  });

server.get('/api/users',
  (require, respond) => {
    const users = [
      {
        id: 1,
        name: 'Guy Montag'
      },
      {
        id: 2,
        name: 'Dorian Gray'
      }
    ]
    respond.status(200).json(users);
  });



module.exports = server; // EXPORT YOUR SERVER instead of {}
