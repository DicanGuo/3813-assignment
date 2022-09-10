var fs = require('fs');
const { stringify } = require('querystring');

module.exports = function(req, res) {
    let groupobj = {
        "groupid": req.body.groupid,
        "groupusers": req.body.groupusers,
        "groupassis": req.body.groupassis,
        "groupadmin": req.body.groupadmin
    }
    let gArray = {};
    let users = {};
    let uArray = [];
    let userData = {};
    let gulist = [];

    // console.log('before: '+userData.ok);
    // find user and write to JSOn if not exist
    fs.readFile('./data/extendedUsers.json', 'utf8', function(err, data) {
        if (err) throw err;

        users = JSON.parse(data);
        // console.log(users);
        for (i in users){
            // console.log(i);
            uArray.push((users[i].username));
        }
        // console.log(uArray);

    });
    if(groupobj.groupid){
        fs.readFile('./data/group.json', 'utf8', function(err, data) {
            //open the file of user list
            // console.log(uArray);
            if (err) throw err;
            gArray = JSON.parse(data);
            // console.log(groupobj);
            // let allgArray = gArray;
            // console.log(gArray)
            // make some change according to user's post 
            let i = gArray.findIndex(x => x.groupid == groupobj.groupid);
            // console.log(i)


            // console.log('before: '+ JSON.stringify(gArray));
            if(i > -1){
                for (k in gArray[i].groupusers){
                    gulist.push(JSON.stringify(gArray[i].groupusers[k]));
                }
                // console.log(gulist)

                let j = groupobj.groupusers.length;
                // console.log(j);
                // console.log(groupobj.groupusers[j-1]);
                let addUser = groupobj.groupusers[j-1];
                // console.log(addUser);
                // console.log(uArray);
                // console.log(gulist);
                // console.log((addUser));
                
                // asign user to group
                let gadmins = [];
                let gassis = [];
                if(groupobj.groupadmin != [] || groupobj.groupassis != []){
                    gadmins = groupobj.groupadmin;
                    gassis = groupobj.groupassis;
                    gArray[i] = groupobj;
                    userData = {gArray};
                    userData['ok']=true;
                    userData['message']='Assigned User';
                    // console.log(userData);
                } else {
                    userData['ok']=false;
                    userData['message']='Input is empty';
                }
            } else {
                userData['ok']=false;
                userData['message']='Failed to add User';
                // console.log(userData);
                // res.send(userData);
            }

            // send response to user
            // res.send(gArray);
            // save the file of user list
            res.send(userData);                
            let gArrayjson = JSON.stringify(gArray);
            fs.writeFile('./data/group.json', gArrayjson, 'utf-8', function(err) {
                if (err) throw err;
            });
        });
    }
}