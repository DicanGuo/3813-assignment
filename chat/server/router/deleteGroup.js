var fs = require('fs');

module.exports = function(req, res) {
    let groupobj = {
        "groupid": req.body.groupid,
        "groupusers": req.body.groupusers,
        "groupassis": req.body.groupassis,
        "groupadmin": req.body.groupadmin
    }
    let gArray = [];
    let loginArray = [];
    let userData = {};
    // console.log('before: '+userData.ok);
    // find user and write to JSOn if not exist
    if(groupobj.groupid){
        fs.readFile('./data/group.json', 'utf8', function(err, data) {
            //open the file of user list
            if (err) throw err;
            gArray = JSON.parse(data);
            // console.log(groupobj);
            // let allgArray = gArray;
            // console.log(allgArray)
            // make some change according to user's post 
            let i = gArray.findIndex(x => x.groupid == groupobj.groupid);
            let idlist = [];
            // console.log('before: '+ JSON.stringify(gArray));
            // if exist delete user
            if(i > -1){
                gArray.pop(gArray[i]);
                // console.log('after: '+ JSON.stringify(gArray));
                userData = {gArray};
                userData['ok']=true;
                userData['message']='Group Deleted';
                console.log('success'+userData);
                res.send(userData);

            } else {
                userData['ok']=false;
                userData['message']='Group Not Exist';
                console.log('failed'+userData);
                res.send(userData);
            }

            // send response to user
            // res.send(gArray);
            // save the file of user list
            let gArrayjson = JSON.stringify(gArray);
            fs.writeFile('./data/group.json', gArrayjson, 'utf-8', function(err) {
                if (err) throw err;
            });
        });
    }
}