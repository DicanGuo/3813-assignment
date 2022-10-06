module.exports = function(app, db){
    app.post('/api/auth', (req, res)=>{
        const assert = require('assert');
        var uname = req.body.username;
        var pwd = req.body.password;
        const collection = db.collection('credentials');
        collection.find({'name':uname, 'password':pwd}).count(function (err,count){
            assert.equal(null, err);

            if (count>0){
                res.send({'username':uname, 'sucess':true});
            }else{
                res.send({'username':'','success':false});
            }
        });
    });
};