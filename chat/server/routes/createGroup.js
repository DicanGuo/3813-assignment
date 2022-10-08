module.exports = function(app, db){
    app.post('/api/createGroup', (req, res)=>{
        const assert = require('assert');
        var id = req.body.id;
        var groupusers = req.body.groupusers;
        var groupassis = req.body.groupassis;
        var groupadmin = req.body.groupadmin;

        const collection = db.collection('groups');
        collection.find().toArray((err,data)=>{
            let idList = []
            for(i in data){
                // console.log(i)
                idList.push(data[i].id)
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
            collection.insertOne({'id':this.id,'groupusers':groupusers, 'groupassis':groupassis, 'groupadmin':groupadmin}, (err,count)=>{
                res.send({'ok':true, 'message':'Group created'});
            })
        })

    });
};