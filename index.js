// Modules
const path = require('path');
const express = require('express');
const bodyParser = require("body-parser")
const mongoose = require('mongoose');
const theRest = require('the.rest');
 
// Connect to MongoDB via Mongoose
mongoose.connect('mongodb://localhost/db-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
 
//Routes
const userRoutes = require("./api/userRoutes")


//ACL
const aclRules = require("./config/acl-rules.json")
const acl = require("./middleware/acl")



// Create an Express server
const app = express();

app.use(
    userRoutes
)

app.use(bodyParser.json())

 
// ..and install the.rest as middleware
// Arguments/configuration:
// 1) The express library
// 2) The base route for the REST api to create
// 3) The path to a folder with mongoose-models 
//    Please Note: This path must be absolute
const pathToModelFolder = path.join(__dirname, 'mongoose-models');
app.use(theRest(express, '/api', pathToModelFolder));
 
 
// Listen on port 5000
app.listen(5000, () => console.log('Listening on port 5000'));