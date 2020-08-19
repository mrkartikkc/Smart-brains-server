const express = require('express'); 
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controller/register');
const signin = require('./controller/signin');
const profile = require('./controller/profile');
const image = require('./controller/image');

const db = knex({
    client: 'pg',
    connection: {
        connectionString : process.env.DATABASE_URL,
        ssl: true,
    }
});


const app = express ();

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res)=> { res.send('it is working');})
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register',(req, res) => { register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id',(req, res) =>{ profile.handleProfile(req, res, db)}) 
app.put('/image',(req, res) =>{ image.handleImage(req, res, db)})
app.post('/imageurl',(req, res) =>{ image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, ()=> {
    console.log(`app is Running on port ${process.env.PORT}`);
})




