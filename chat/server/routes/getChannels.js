module.exports = function(app, db){
    app.post('/api/getChannels', (req, res)=>{
        console.log('received: ' + req.body.id)
        let targetID = req.body.id;
        console.log('targetID: ' + targetID)
        const collection = db.collection('channels');
        collection.find({'groupid':targetID}).sort({id:1}).toArray((err,data)=>{
            for(i in data){
                console.log(i)
            }
            res.send(data);
            console.log('channels found');
        })
    });
};