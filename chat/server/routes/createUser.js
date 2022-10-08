const { type } = require('os');

module.exports = function(app, db){
    app.post('/api/createUser', (req, res)=>{
        const assert = require('assert');
        var id = req.body.id;
        console.log(id);
        var uname = req.body.name;
        var pwd = req.body.password;
        var role = req.body.role;
        var email = req.body.email;

        const collection = db.collection('credentials');
        if(uname == '' || pwd == ''){
            res.send({'ok':false, 'message':'User name and Password cannot be empty !'})
        }else{
            collection.find({'name':uname}).count(function (err,count){
                assert.equal(null, err);
                if (count>0){
                    res.send({'ok':false, 'message':'User already exist'});
                }else{
                    collection.find().toArray((err,ids)=>{
                        let idList = []
                        for(i in ids){
                            // console.log(i)
                            idList.push(ids[i].id)
                        }  
                        console.log(idList);
                        for(let j = 0; j< idList.length + 1; j++){
                            // console.log(j + " in list: "+(j in idList))
            
                            if(!(idList.includes(j.toString()))){
                                console.log(j + ' is available')
                                this.id = j.toString()
                                console.log('id set as: '+ this.id + type(this.id))
                                break
                            }
                        }
                        collection.insertOne({'id':this.id,'name':uname, 'password':pwd, 'role':role,'email':email}, (err,data)=>{
                            res.send({'ok':true, 'message':'User created'});
                            console.log(data);
                        });
                    });
                };
            });
        };
    });
};