import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
const http = require('http');

const app = express();

import router from './router';

require('dotenv').config(); // load environment variables


//database setup
const mongoURI =  process.env.mongoURI;
mongoose.connect(mongoURI,{ useNewUrlParser: true });

mongoose.connection.on("open", function(ref) {

    console.log("Connected to mongo");
  });
  
  mongoose.connection.on("error", function(err) {
    console.log("Could not connect to mongo! ");
    return console.log(err);
  });
// set mongoose promises to es6 default
mongoose.Promise = global.Promise;

// initialize
// enable/disable cross origin resource sharing if necessary
app.use(cors());

// enable/disable http request logging
app.use(morgan('dev'));

// enable json message body for posting data to API
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);
// default index route
app.get('/', (req, res) => {
    res.send('👋');
  });
// START THE SERVER
// =============================================================================
const port = process.env.PORT || 8080;
app.listen(port);

console.log(`listening on: ${port}`);
