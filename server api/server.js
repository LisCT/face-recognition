const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs'); // encode passwords (security)
const cors = require('cors'); // access from http request 
const knex = require('knex');

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

    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then((data) => {

            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            
            if (isValid) {

                db.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then((user) => {
                        
                        res.json(user[0]);

                    })
                    .catch(err => res.status(400).json('unable to get user'));

            } else {

                res.status(400).json('wrong credentials');
            
            }
        
        })
        .catch(err => res.status(400).json('wrong credencials'));
    
});

app.post('/register', (req, res) => {

    const { email, name, password } = req.body;
    const hash = bcrypt.hashSync(password);

    db.transaction((trx) => {

        trx.insert({
            hash,
            email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0],
                    name,
                    joined: new Date()
                })
                .then((user) => {

                    res.json(user[0]);
                
                }))
            .then(trx.commit)
            .catch(trx.rollback);
    
    })
        .catch(err => res.status(400).json('unable to register'));

});
  

app.get('/profile/:id', (req, res) => {

    const { id } = req.params;

    db.select('*').from('users').where({ id })
        .then((user) => {

            if (user.length) {

                res.json(user[0]);

            } else {

                res.status(400).json('error getting user');

            }
        
        });

    return false;

});

app.put('/image', (req, res) => {

    const { id } = req.body;

    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then((entries) => {

            res.json(entries[0]);
        
        })
        .catch(err => res.status(400).json('unable to get entries'));

});

app.listen(3001, () => {

    console.log('app is running on port 3001');

});
