module.exports = function(app, db){
    app.post('/api/createGroup', (req, res)=>{
        const assert = require('assert');
        var id = req.body.id;
        var groupusers = req.body.groupusers;
        var groupassis = req.body.groupassis;
        var groupadmin = req.body.groupadmin;

        const collection = db.collection('groups');
        const collection2 = db.collection('credentials');

        if (groupadmin == ''){
            res.send({'ok':false, 'message':'Group must have a admin !'})
        }else{
            let userList = [];
            let usercount = 0;
            let admincount = 0;
            let assiscount = 0;
            let str1 = '';
            let str2 = '';
            let str3 = '';
            
            collection2.find().toArray((err,users)=>{
                // console.log(users)

                for(i in users){
                    // console.log(users[i])
                    // console.log(i)

                    userList.push(users[i].name);
                }
                console.log(userList)
                for(u in groupusers){
                    if(userList.includes(groupusers[u])){
                        usercount += 1;
                    }
                }
                for(u in groupadmin){
                    console.log(groupadmin[u])

                    if(userList.includes(groupadmin[u])){
                        admincount += 1;
                    }
                }
                for(u in groupassis){
                    if(userList.includes(groupassis[u])){
                        assiscount += 1;
                    }
                }
                console.log(usercount,admincount,assiscount)
                if(usercount == 0){
                    str1 = ' User not an existing user! '
                }
                if(admincount == 0){
                    str2 = ' Admin not an existing user! '
                }
                if(assiscount == 0){
                    str3 = ' Assistant not an existing user! '
                }
                console.log(str1,str2,str3)

                if((usercount == 0) || (admincount == 0) || (assiscount == 0)){
                    let message = str1.concat(" ", str2, " ", str3);
                    console.log(message);
                    res.send({'ok':false, 'message':message});
                }else{
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
                        collection.insertOne({'id':this.id,'groupusers':groupusers, 'groupassis':groupassis, 'groupadmin':groupadmin}, (err,count)=>{
                            res.send({'ok':true, 'message':'Group created'});
                        })
                    })
                }
    
            });

        };
    });
};