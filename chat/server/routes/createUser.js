module.exports = function(app, db){
    app.post('/api/createUser', (req, res)=>{
        const assert = require('assert');
        var id = req.body.id;
        var uname = req.body.name;
        var pwd = req.body.password;
        var role = req.body.role;
        var email = req.body.email;

        const collection = db.collection('credentials');
        collection.find({'name':uname}).count(function (err,count){
            assert.equal(null, err);
            if (count>0){
                res.send({'ok':false, 'message':'User already exist'});
            }else{
                collection.insertOne({'id':id,'name':uname, 'password':pwd, 'role':role,'email':email}), function (err,count){
                    res.send({'ok':true});
                }
                // res.send({'ok':true});
            }
        });
    });
};