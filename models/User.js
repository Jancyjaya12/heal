const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

// Create a Mongoose Schema that defines rules for a Document.
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
});

// Define a Mongoose Model, deriving from the Schema defined earlier
// It is given the name of "User" which automatically creates a collection
// called 'users' in MongoDB Database (done by Mongoose).


const userModel = mongoose.model("User", userSchema);

module.exports = userModel;