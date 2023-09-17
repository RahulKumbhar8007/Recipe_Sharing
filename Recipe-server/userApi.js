const express = require('express');
const mongoose = require('mongoose');

const routes = express.Router();
const jwt = require('jsonwebtoken');




const userSchema = mongoose.Schema({
  yourName: String,
  Email: String,
  Password: String,
  token: String,
  Message: String,

});

const userModel = mongoose.model('userDetails', userSchema, 'userDetails');

routes.post('/addDetails', (req, res) => {
  let userdata = req.body;
  let userRequest = {

    yourName: userdata.name,
    Email: userdata.email,
    Password: userdata.password,
  }
  let user = new userModel(userRequest);

  userModel.findOne({ Email: userdata.email }, (error, data) => {
    if (data) {
      res.json({ AlreadyRegisterMessage: "you have already registered" });
    } else {
      user.save((error, data) => {
        if (error) {
          res.json({ error_message: error });
        } else {
          res.json({ message: "user added successfully", id: data.id });
        }
      })
    }


  })

});



routes.post('/signIn', (req, res) => {
  let loginRequest = req.body;
  userModel.findOne({ Email: loginRequest.email }, (error, data) => {
    if (!data) {
      res.json({ message: "something went wrong" });
    } else {
      if (data.Email !== loginRequest.email) {
        res.json({ message: "Email not matched" });
      } else if (data.Password !== loginRequest.password) {
        res.json({ message: "password did not match" });
      } else {
        let payload = { signature: data._id };
        let token = jwt.sign(payload, 'string');


        // Store the generated token in the user document
        data.token = token;
        data.save((error) => {
          if (error) {
            return res.json({ message: "Error saving token" });
          }
          res.json({ message: "user logged in successfully", jwttoken: token, id: data.id });
        });
      }
    }
  });
});


function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  jwt.verify(token, 'string', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Token is valid, retrieve the user based on the token
    userModel.findOne({ _id: decoded.signature, token: token }, (error, user) => {
      if (error) {
        return res.status(500).json({ message: "Error retrieving user" });
      }

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Attach the user object to the request for further processing
      req.user = user;
      console.log(user);
      next();
    });
  });
}

// Apply middleware to protected route
routes.get('/getData', authenticate, (req, res) => {
  const user = req.user;
  res.json(user);
});





routes.post('/saveMessage', authenticate, (req, res) => {
  const user = req.user;
  const message = req.body.message;

  // Update the user document with the message
  user.Message = message;
  user.save((error) => {
    if (error) {
      return res.status(500).json({ message: 'Error saving message' });
    }
    res.json({ message: 'Message saved successfully' });
  });
});


module.exports = routes;






