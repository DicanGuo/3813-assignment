module.exports = function(app, db){
    app.post('/api/createChannel', (req, res)=>{
        const assert = require('assert');
        id = req.body.id;
        groupid = req.body.groupid;
        channelusers = [];

        const collection = db.collection('channels');

        collection.find().toArray((err,data)=>{
            console.log(data)
            let idList = []
            for(i in data){
                // console.log(i)
                idList.push(data[i].id);
            }
            console.log(idList);
            // console.log(idList.length)
            let count = 0;
            for(let j = 0; j< idList.length + 1; j++){
                // console.log(j + " in list: "+(j in idList))

                if(!(idList.includes(j))){
                    console.log(j + ' is available')
                    this.id = j
                    console.log('id set as: '+ this.id)
                    break
                }
            }
            collection.insertOne({'id':this.id,'groupid':this.groupid, 'channelusers':this.channelusers}, (err,count)=>{
                res.send({'ok':true, 'message':'Channel created'});
            })
        })
    });
};