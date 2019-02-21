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
        host: '127.0.0.1',
        user: 'lisbelcruz',
        password: '',
        database: 'face-recognition'
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

// test purposes
const database = {
    users: [
        {
            id: '123',
            name: 'John',
            password: 'cookies',
            email: 'john@gmail.com',
            entries: 0,
            joined: new Date()
        },
        {
            id: '1234',
            name: 'Sally',
            password: 'bananas',
            email: 'sally@gmail.com',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '908',
            has: '',
            email: 'john@gmail.com'
        }
    ]
};

app.get('/', (req, res) => {

    res.send(database.users);

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

app.listen(3001, () => {

    console.log('app is running on port 3001');

});
