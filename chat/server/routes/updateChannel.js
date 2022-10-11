module.exports = function(app, db, ObjectID){
    app.put('/api/updateChannel', (req, res)=>{
    //     const assert = require('assert');
        var _id = req.body._id;
        let ObjectId = new ObjectID(_id);
        var id = req.body.id;
        var channelusers = req.body.channelusers;
        var groupid = req.body.groupid;
    //     var groupadmin = req.body.groupadmin;
    //     console.log("Received: " + id,groupadmin,groupassis,groupusers)
    //     // console.log(_id)

        const collection = db.collection('channels');
        const collection2 = db.collection('credentials');
        let list = [];
        let userList = [];
        let count = 0;
        collection2.find().toArray((err,users)=>{
            for(i in users){
                // console.log(users[i])
                // console.log(i)
                userList.push(users[i].name);
            };
            // console.log(userList)
            for(i in channelusers){
                if(!(channelusers[i] == '')){
                    list.push(channelusers[i])
                }
            }
            for(i in list){
                    if(!(userList.includes(list[i]))){
                        count += 1;
                    }
            }
    //         console.log(count)
            if(count > 0){
                res.send({'ok':false, 'message':'User not exists'})
            }else{
                query = {'_id':ObjectId, 'id':id, 'groupid':groupid, 'channelusers':channelusers}
                collection.updateOne({'_id':ObjectId}, {$set:query}, (err,data)=>{
                    console.log(data)
                    collection.find({}).toArray((err,data)=>{
                        console.log(data)
                        let sendData = {};
                        sendData['channels']=data;
                        sendData['ok']=true;
                        sendData['message']='channel updated';
                        collection.find({'_id':ObjectId}).toArray((err,target)=>{
                            sendData['targetChannel']=target;
                            res.send(sendData);
                        })
                    })
                })
            }

        })
    });
};