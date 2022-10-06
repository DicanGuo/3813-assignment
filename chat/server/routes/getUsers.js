module.exports = function(app, db){
    app.get('/api/getUsers', (req, res)=>{
        var ulist = {}
        const collection = db.collection('credentials');
        collection.find().toArray((err,data)=>{
            for(i in data){
                console.log(i)
                delete data[i]['password']
            }
            res.send(data);
            console.log('prods found');
        })
    });
};