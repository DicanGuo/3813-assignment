var fs = require('fs');

module.exports = function(req, res) {
    let groupobj = {
        "groupid": req.body.groupid,
        "groupusers": req.body.groupusers,
        "groupassis": req.body.groupassis,
        "groupadmin": req.body.groupadmin
    }
    let gArray = {};
    let users = {};
    let uArray = {};
    let userData = {};

    fs.readFile('./data/extendedUsers.json', 'utf8', function(err, data) {
        if (err) throw err;

        users = JSON.parse(data);
        // console.log(users);

        for (i in users){
            // console.log(i);
            uArray[users[i].username]=true;
        }
    });

    fs.readFile('./data/group.json', 'utf8', function(err, data) {
        console.log(uArray);
        //open the file of user list
        if (err) throw err;
        gArray = JSON.parse(data);
        // console.log(groupobj);
        if (groupobj.groupusers[0] != '' & groupobj.groupadmin[0] != '' & groupobj.groupassis[0] != '') {
            // console.log(groupobj.groupusers[0] in uArray);

            if (!(groupobj.groupusers[0] in uArray) || !(groupobj.groupadmin[0] in uArray) || !(groupobj.groupassis[0] in uArray)){
                // console.log(gArray.ok);
                // console.log(gArray.message);
                // console.log(gArray);
                userData ={gArray};
                userData['ok']=false;
                userData['message']='Member not exist';
                res.send(userData);
            } else {
                let idlist = [];
                for(j in gArray){
                    idlist.push(gArray[j].groupid);
                }
                console.log(idlist)

                for(k=0; k < (idlist.length+2); k++){
                    // console.log(k)
                    // console.log(!(k in idlist))
                    if(!(k in idlist)){
                        groupobj.groupid = k;
                        console.log(groupobj);
                        break
                    }
                }
                gArray.push(groupobj);
                userData ={gArray};
                userData['ok']=true;
                userData['message']='Group successfully created'
                res.send(userData);
            }

        } else {
            userData['ok']=false;
            userData['message']='Group need a member'
            // console.log(userData);
            res.send(userData);
        }

        // send response to user
        // console.log(gArray);
        // res.send(gArray);
        // save the file of user list
        let gArrayjson = JSON.stringify(gArray);
        fs.writeFile('./data/group.json', gArrayjson, 'utf-8', function(err) {
            if (err) throw err;
        });
    });
}