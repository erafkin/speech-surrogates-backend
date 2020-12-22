// Written by Emma Rafkin 2020
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';

import userrouter from './routers/user-router';
import authrouter from './routers/auth-router';
import blogrouter from './routers/blog-router';
import grantlanguagerouter from './routers/grant-language-router';
import news from './routers/news-router';
import maplanguagerouter from './routers/map-languages-router';
import aboutrouter from './routers/about-router';

const app = express();

require('dotenv').config(); // load environment variables


// database setup
const { mongoURI } = process.env;
mongoose.connect(mongoURI, { useNewUrlParser: true });

mongoose.connection.on('open', (ref) => {
	console.log('Connected to mongo');
});

mongoose.connection.on('error', (err) => {
	console.log('Could not connect to mongo! ');
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
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/users', userrouter);
app.use('/api/auth', authrouter);
app.use('/api/blog', blogrouter);
app.use('/api/grant-languages', grantlanguagerouter);
app.use('/api/news', news);
app.use('/api/map', maplanguagerouter);
app.use('/api/about', aboutrouter);


// default index route
app.get('/', (req, res) => {
	res.send('👋');
});
// START THE SERVER
// =============================================================================
const port = process.env.PORT || 3000;
app.listen(port);

console.log(`listening on: ${port}`);
