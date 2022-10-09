module.exports = function(app, db){
    app.get('/api/getGroups', (req, res)=>{
        var ulist = {}
        const collection = db.collection('groups');
        collection.find().sort({id:1}).toArray((err,data)=>{
            for(i in data){
                console.log(i)
            }
            res.send(data);
            console.log('groups found');
        })
    });
};