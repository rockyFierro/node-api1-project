// BUILD YOUR SERVER HERE
const express = require('express');
const server = express();
const User = require('./users/model')

server.use(express.json())

server.post('/api/users', async (request, respond) => {
  const data = request.body;
  const newData = await User.insert(data);
  respond.status(201).json(newData);
})

server.get('/',
  (request, respond) => {
    respond.send('hello there, express welcomes you.');
  });

server.get('/api/users', async (request, respond) => {
  const users = await User.find();
  respond.status(200).json(users);
});

server.get('/api/users/:id', async (request, response) => {
  const { id } = request.params.id;
  const user = await User.findById(id);
  response.status(200).json(user);
});

server.delete('/api/users/:id', async (request, response)=>{
  const { id } = request.params.id;
  const data = await User.remove(id);
  response.status(204).json(data);
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
