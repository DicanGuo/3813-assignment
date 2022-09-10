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
// app.post('/api/login', (req,res)=>{
//     let channels = [
//         {
//             id: 1,
//             groupIn: [1]
//         },
//         {
//             id: 2,
//             groupIn: [2,3]
//         }

//     ]
//     if (!req.body) {
//         return res.sendStatus(400)
//     }

//     var data = {};
//     var customer = {};
//     var groupsSession = {};
//     var allUser = {};
//     // var channelSession = {};


//     customer.username = req.body.username;
//     customer.email = req.body.email;
//     customer.valid = false;
//     for (let i = 0; i < users.length; i ++){
//         if (req.body.username == users[i].username && req.body.email == users[i].email){
//             customer.valid = true;
//             customer.id = users[i].id;
//             customer.role = users[i].role;
//             groupsSession = groups;
//             allUser = users;
//             // if super admin retreive all
//             if (customer.id == 1){
//             }
//             // if group admin retreive all
//             else if (customer.id == 1){
                
//             }
//             // if group assis retreive all
//             else if (customer.id == 1){
                
//             }
//             // users
//             else {

//             }
//         }
//     }
//     data = {
//         userinfo : customer,
//         groupinfo : groupsSession,
//         allUser : allUser
//     }
//     res.send(data);

// });

app.post('/login', require('./router/postLogin'));
app.post('/loginafter', require('./router/postLoginAfter'));
app.post('/group', require('./router/group'));
app.post('/deleteuser', require('./router/deleteUser'));
app.post('/creategroup', require('./router/createGroup'));


