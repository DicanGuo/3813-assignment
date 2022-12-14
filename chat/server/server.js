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

// sockets.connect(io,PORT);

server.listen(http, PORT);

// app.post('/login', require('./router/postLogin'));
// app.post('/loginafter', require('./router/postLoginAfter'));
// app.post('/group', require('./router/group'));
// app.post('/deleteuser', require('./router/deleteUser'));
// app.post('/creategroup', require('./router/createGroup'));
// app.post('/deletegroup', require('./router/deleteGroup'));
// app.post('/updategroup', require('./router/updateGroup'));
// app.post('/assignUser', require('./router/assignUser'));
// app.post('/channel', require('./router/channel'));
// app.post('/createchannel', require('./router/createChannel'));
// app.post('/updatechannel', require('./router/updateChannel'));
// app.post('/deletechannel', require('./router/deleteChannel'));
// app.post('/removeFromChannel', require('./router/removeFromChannel'));

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
var ObjectID = require('mongodb').ObjectId;

MongoClient.connect(url, function(err,client){
    if(err){return console.log(err)}
    const dbName = '3813';
    const db =client.db(dbName);
    require('./routes/auth.js')(app, db);
    require('./routes/createUser.js')(app, db);
    require('./routes/getUsers.js')(app, db);
    require('./routes/deleteUser.js')(app, db, ObjectID);

    require('./routes/getGroups.js')(app, db);
    require('./routes/createGroup.js')(app, db);
    require('./routes/deleteGroup.js')(app, db, ObjectID);
    require('./routes/updateGroup.js')(app, db, ObjectID);
    
    require('./routes/getChannels.js')(app, db);
    require('./routes/createChannel.js')(app, db);
    require('./routes/deleteChannel.js')(app, db, ObjectID);
    require('./routes/updateChannel.js')(app, db, ObjectID);
    const collection = db.collection('credentials');
    // const collection2 = db.collection('channels');

    // var socketRoom = [];
    // var channels = [];
    // collection.find().sort({id:1}).toArray((err,data)=>{
    //     for(i in data){

    //         socketRoom.push([data[i]['name'], -1]);
    //         console.log('Inside connection' + socketRoom)
    //     }
    //     console.log('Outside connection' + socketRoom[0])


    // })
    sockets.connect(io,PORT);


    // collection2.find().sort({id:1}).toArray((err,data)=>{
    //     // console.log(data)
    //     for(i in data){
    //         channels.push(data[i]);
    // }})
    // sockets.connect(io,PORT, socketRoom,channels);

    // require('./routes/socket.js')(app, io, db);
    require('./listen.js');
    

})




