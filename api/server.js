// BUILD YOUR SERVER HERE
const express = require('express');

const server = express();

server.get('/',
(require, respond)=>{
  respond.send('hello there, express welcomes you.');
});


module.exports = {}; // EXPORT YOUR SERVER instead of {}
