const { count } = require('console');
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

                let l = groupobj.groupadmin.length;
                let p = groupobj.groupassis.length;

                // console.log(j);
                // console.log(groupobj.groupusers[j-1]);
                let newadmin = groupobj.groupadmin[l-1];
                let newassis = groupobj.groupassis[p-1];
                let countA =0;
                let countB = 0;
                // console.log(newadmin);
                // console.log(groupobj.groupadmin);
                for(admin in groupobj.groupadmin){
                    console.log(admin);
                    if (newadmin == groupobj.groupadmin[admin]){
                        countA +=1;
                    }
                }
                for(assis in groupobj.groupassis){
                    if (newassis == groupobj.groupassis[assis]){
                        countB +=1;
                    }
                }
                console.log(countA, countB);
                // console.log(uArray);
                // console.log(gulist);
                
                // asign user to group
                if(countA == 1 && countB == 1){
                    // gadmins = groupobj.groupadmin;
                    // gassises= groupobj.groupassis;
                    gArray[i] = groupobj;
                    userData = {gArray};
                    userData['ok']=true;
                    userData['message']='Assigned Group Admin & Assistant';
                    // console.log(userData);
                } else if(countA == 0 && countB == 1){
                    // gassises= groupobj.groupassis;
                    groupobj.groupadmin = gArray[i].groupadmin;
                    gArray[i] = groupobj;
                    userData = {gArray};
                    userData['ok']=true;
                    userData['message']='Assigned Group Assistant';
                } else if(countA == 1 && countB == 0){
                    // gassises= groupobj.groupassis;
                    groupobj.groupassis = gArray[i].groupassis;
                    gArray[i] = groupobj;
                    userData = {gArray};
                    userData['ok']=true;
                    userData['message']='Assigned Group Admin';
                } else {
                    userData = {gArray};
                    userData['ok']=false;
                    userData['message']='Input is invalid';
                }
            } else {
                userData = {gArray};
                userData['ok']=false;
                userData['message']='Failed to add User';
                // console.log(userData);
                // res.send(userData);
            }
            res.send(userData);                
            // let gArrayjson = JSON.stringify(gArray);
            // fs.writeFile('./data/group.json', gArrayjson, 'utf-8', function(err) {
            //     if (err) throw err;
            // });
        });
    }
}