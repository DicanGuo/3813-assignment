// used for routing
var express = require('express');
var app = express();
// provide http functionality
var http = require('http').Server(app);
const path = require('path');

app.use(express.static(__dirname + '/www'));
// use bodyparser
app.use(express.json());



const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const io = require('socket.io')(http,{
    cors: {
        origin: 'http://localhost:4200',
        methods: ['GET','POST'],
    }
});

const sockets = require('./socket.js');
const server = require('./listen.js');
const PORT = 3000;

var cors = require('cors');
app.use(cors());

sockets.connect(io,PORT);
server.listen(http, PORT);

//route for check inputs
app.post('/api/login', (req,res)=>{
    // let users = [
    //     {'email': 'abc@com.au', 'password': '123'}, 
    //     {'email': 'abd@com.au', 'password': '123'}, 
    //     {'email': 'abe@com.au', 'password': '123'}, ]
    let users = [
        {'username': 'first',
        'birthdate': '01/01/1991',
        'age': 31,
        'email': 'first@gmail.com',
        'password': '123456',
        'valid': false},
        {'username': 'second',
        'birthdate': '01/01/1991',
        'age': 31,
        'email': 'second@gmail.com',
        'password': '654321',
        'valid': false},
        {'username': 'third',
        'birthdate': '01/01/1991',
        'age': 31,
        'email': 'third@gmail.com',
        'password': '555555',
        'valid': false},
    ]
    if (!req.body) {
        return res.sendStatus(400)
    }
    var customer = {};
    customer.username = req.body.username;
    customer.password = req.body.password;
    customer.valid = false;
    for (let i = 0; i < users.length; i ++){
        if (req.body.username == users[i].username && req.body.password == users[i].password){
            customer.valid = true;
            customer.birthdate = users[i].birthdate;
            customer.age = users[i].age;
            customer.email = users[i].email;
        }
    }
    res.send(customer);
});

// // start server listening
// let server = http.listen(3000, function () {
//     let host = server.address().address;
//     let port = server.address().port;
//     console.log("My First Nodejs Server!");
//     console.log("Server listening on: "+ host + " port: " + port);
// });