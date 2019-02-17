const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs'); // encode passwords (security)
const cors = require('cors'); // access from http request 

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

    if (req.body.email === database.users[0].email
        && req.body.password === database.users[0].password) {

        res.json(database.users[0]);

    } else {

        res.status(400).json('error loging in');
    
    }
    
});

app.post('/register', (req, res) => {

    const { email, name } = req.body;
    database.users.push({

        id: '12345',
        name,
        email,
        entries: 0,
        joined: new Date()

    });

    res.json(database.users[database.users.length - 1]);

});

app.get('/profile/:id', (req, res) => {

    const { id } = req.params;
    let found = false;

    database.users.forEach((user) => {

        if (user.id === id) {

            found = true;
            return res.json(user);
    
        } 
        

        return false;

    });

    if (!found) {

        return res.status(400).json('error user not found');

    }

    return false;

});

app.put('/image', (req, res) => {

    const { id } = req.body;
    let found = false;

    database.users.forEach((user) => {

        if (user.id === id) {

            found = true;
            user.entries += 1;

            return res.json(user.entries);
    
        } 

        return false;
        

    });

    if (!found) {

        return res.status(400).json('error user not found');

    }

    return false;

});

// REGISTER
// bcrypt.hash('bacon', null, null, (err, hash) => {
//     // Store hash in your password DB.
// });

// SIGN IN
// // Load hash from your password DB.
// bcrypt.compare('bacon', hash, (err, res) => {
//     // res == true
// });
// bcrypt.compare('veggies', hash, (err, res) => {
//     // res = false
// });

app.listen(3001, () => {

    console.log('app is running on port 3001');

});
