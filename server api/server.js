const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs'); // encode passwords (security)
const cors = require('cors'); // access from http request 
const knex = require('knex');

// Controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});

/*
    END POINTS

    /                   --> this is working
    /signin             --> POST success/fail JSON
    /register           --> POST => user
    /profile/:userId    --> GET => user
    /image              --> PUT => user

*/

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {

    res.send('It is working');

});

app.post('/signin', (req, res) => {

    signin.handleSignin(req, res, db, bcrypt);

});

app.post('/register', (req, res) => {

    register.handleRegister(req, res, db, bcrypt);
 
});
  

app.get('/profile/:id', (req, res) => {

    profile.handleProfile(req, res, db);

});

app.put('/image', (req, res) => {

    image.handleImage(req, res, db);

});

app.post('/imageurl', (req, res) => {

    image.handleApiCall(req, res);

});

app.listen(process.env.PORT || 300, () => {

    console.log(`app is running on port ${process.env.PORT}`);

});
