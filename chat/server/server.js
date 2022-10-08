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

app.post('/login', require('./router/postLogin'));
app.post('/loginafter', require('./router/postLoginAfter'));
app.post('/group', require('./router/group'));
app.post('/deleteuser', require('./router/deleteUser'));
app.post('/creategroup', require('./router/createGroup'));
app.post('/deletegroup', require('./router/deleteGroup'));
app.post('/updategroup', require('./router/updateGroup'));
app.post('/assignUser', require('./router/assignUser'));
app.post('/channel', require('./router/channel'));
app.post('/createchannel', require('./router/createChannel'));
app.post('/updatechannel', require('./router/updateChannel'));
app.post('/deletechannel', require('./router/deleteChannel'));
app.post('/removeFromChannel', require('./router/removeFromChannel'));

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
MongoClient.connect(url, function(err,client){
    if(err){return console.log(err)}
    const dbName = '3813';
    const db =client.db(dbName);
    require('./routes/auth.js')(app, db);
    require('./routes/createUser.js')(app, db);
    require('./routes/getUsers.js')(app, db);
    require('./routes/getGroups.js')(app, db);
    // require('./routes/socket.js')(app, io, db);
    require('./listen.js');

})




