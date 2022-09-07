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
    let users = [
        {'username': '1',
        'id': 1,
        // 'email': 'super@gmail.com',
        'email': '1',
        'valid': false,
        'role': 'super'},                   
        {'username': '2',
        'id': 2,
        // 'email': 'group@gmail.com',
        'email': '2',
        'valid': false,
        'role': 'group'},
        {'username': '3',
        'id': 6,
        // 'email': 'group@gmail.com',
        'email': '3',
        'valid': false,
        'role': 'user'},
        {'username': 'first',
        'id': 3,
        'email': 'first@gmail.com',
        'valid': false,
        'role': 'user'},
        {'username': 'second',
        'id': 4,
        'email': 'second@gmail.com',
        'valid': false,
        'role': 'user'},
        {'username': 'third',
        'id': 5,
        'email': 'third@gmail.com',
        'valid': false,
        'role': 'user'},
    ]
    let groups = [
        {}
    ]
    if (!req.body) {
        return res.sendStatus(400)
    }
    var customer = {};
    customer.username = req.body.username;
    customer.email = req.body.email;
    customer.valid = false;
    for (let i = 0; i < users.length; i ++){
        if (req.body.username == users[i].username && req.body.email == users[i].email){
            customer.valid = true;
            customer.id = users[i].id;
            customer.role = users[i].role;
        }
    }
    res.send(customer);
});
