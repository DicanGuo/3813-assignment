module.exports = function(app, db, ObjectID){
    app.put('/api/updateGroup', (req, res)=>{
        const assert = require('assert');
        var _id = req.body._id;
        let ObjectId = new ObjectID(_id);
        var id = req.body.id;
        var groupusers = req.body.groupusers;
        var groupassis = req.body.groupassis;
        var groupadmin = req.body.groupadmin;
        console.log("Received: " + id,groupadmin,groupassis,groupusers)
        // console.log(_id)

        const collection = db.collection('groups');
        const collection2 = db.collection('credentials');
        let list = [];
        let userList = [];
        let count = 0;
        for(i in groupusers){
            if(!(groupusers[i] == '')){
                list.push(groupusers[i])
            }
        }
        for(i in groupassis){
            if(!(groupassis[i] == '')){
                list.push(groupassis[i])
            }
        }
        for(i in groupadmin){
            if(!(groupadmin[i] == '')){
                list.push(groupadmin[i])
            }
        }
        console.log(list)

        collection2.find().toArray((err,users)=>{
            for(i in users){
                // console.log(users[i])
                // console.log(i)
                userList.push(users[i].name);
            };
            console.log(userList)
            for(i in list){
                    if(!(userList.includes(list[i]))){
                        count += 1;
                    }
            }
            console.log(count)
            if(count > 0){
                res.send({'ok':false, 'message':'User not exists'})
            }else{
                query = {'_id':ObjectId, 'id':id, 'groupusers':groupusers, 'groupassis':groupassis, 'groupadmin':groupadmin}
                collection.updateOne({'_id':ObjectId}, {$set:query}, (err,data)=>{
                    console.log(data)
                    collection.find({'_id':ObjectId}).toArray((err,data)=>{
                        data[0]['ok']=true;
                        data[0]['message']='Group updated';
                        res.send(data[0])
                    })
                })
            }

        })
    });
};