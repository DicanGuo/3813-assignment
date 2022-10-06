module.exports = function(app, db){
    app.post('/api/auth', (req, res)=>{
        const assert = require('assert');
        var name = req.body.name;
        var pwd = req.body.password;
        const collection = db.collection('credentials');
        collection.find({'name':name, 'password':pwd}).toArray((err,data)=>{
            // console.log(data)
            if (data.length>0){
                // var send = [data, {'valid':true}]
                user = data;
                sendData={user};
                sendData['valid']=true
                // console.log(send)
                res.send(sendData);
                
            }else{
                sendData={};
                sendData['valid']=false;
                sendData['message']='User name or password is invalid !';

                // data=[{'valid':false}, {'message':'User name or password is invalid !'}];

                res.send(sendData);
            }
        });       
})};