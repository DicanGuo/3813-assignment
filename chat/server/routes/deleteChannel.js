module.exports = function(app, db, ObjectID){
    app.post('/api/deleteChannel', (req, res)=>{
        if (!req.body){
            return res.sendStatus(400);
        }
        const assert = require('assert');
        _id = new ObjectID(req.body._id);
        var targetid = new ObjectID(_id);
        console.log('targetid: ' + targetid)
        const collection = db.collection('channels');
        collection.deleteOne({'_id':targetid}, (err,result)=>{
            if(err)throw err;
            console.log(result)
            collection.find().sort({id:1}).toArray((err,data)=>{
                res.send(data);
                // console.log('prods found');
            })
        })
    });
};