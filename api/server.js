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
          message: "White Rabbit object, whatever it is;" +
            " It did it all.",
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
          response.status(400).json({ message: 'bad request, please check Uri spelling.' })
      })
      .catch(error => {
        response.status(404).json({
          message: "The user with the specified ID does not exist.",
          error: error.message,
          stack: error.stack,
          status: error.status
        });
      });
  });

//POST	/api/users	Creates a user using the information sent inside the request body.
server.post('/api/users',
  (request, response) => {
    const user = request.body;

    (!user.name || !user.bio) ?
      response.status(400).json({
        message: "Please provide name and bio for the user"
      }) : User.insert(user)
        .then(newUser => {
          response.status(201).json(newUser);
          console.log('new user created');
        })
        .catch(error => {
          response.status(500).json({
            message: "Uh oh! Something wen't wrong creating user.",
            error: error.message,
            stack: error.stack,
            status: error.status
          });
        });
  });

server.delete('/api/users/:id', async (request, response) => {
  const possibleUser = await User.findById(request.params.id);

  if (!possibleUser) {
    response.status(404).json({ message: "The user with the specified ID does not exist" });

  } else {
    const deletedUser = await User.remove(possibleUser.id);
    response.status(200).json(deletedUser);
  }
});

server.put('/api/users/:id', async (request, response) => {
  try {
    const possibleUser = await User.findById(request.params.id);
    if (!possibleUser) {
      response.status(404).json({
        message: 'The user with the specified ID does not exist'
      });
    } else {
      if (!request.body.name || !request.body.bio) {
        response.status(400).json({
          message: 'Please provide name and bio for the user'
        });
      } else {
       const updatedUser = await User.update(request.params.id, request.body);
       response.status(200).json(updatedUser)
      }
    }
  }
  catch (error) {
    response.status(500).json({
      message: "The user information could not be modified",
      status: error.status,
      stack: error.stack
    });
  }
});

server.get('*',
  (request, response) => {
    response.status(404).json({
      message: 'does not exist'
    });
  });

module.exports = server;
