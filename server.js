const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// require routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// Bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true }) 
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
  

app.get('/', (req, res) => res.send('Hello World!'));

// Use Routes
app.use('/api/users', users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// PORT for Heroku configuration, else 5000
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));