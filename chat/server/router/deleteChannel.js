var fs = require('fs');

module.exports = function(req, res) {
    let groupobj = {
        "groupid": req.body.group.groupid,
        "groupusers": req.body.group.groupusers,
        "groupassis": req.body.group.groupassis,
        "groupadmin": req.body.group.groupadmin
    }
    let channelobj = {
        "channelid": req.body.channel.channelid,
        "cgid":String(req.body.channel.cgid),
        "channelusers": req.body.channel.channelusers
    }
    // console.log('groupobj'+typeof(groupobj.groupid))
    console.log('channelobj '+ (channelobj.channelid))
    let cArray = [];
    let userData = {};
    // console.log('before: '+userData.ok);
    // find user and write to JSOn if not exist
    console.log(groupobj.groupid )
    if(groupobj.groupid >=0 && channelobj.channelid){
        fs.readFile('./data/channel.json', 'utf8', function(err, data) {
            //open the file of user list
            if (err) throw err;
            cArray = JSON.parse(data);
            // console.log(groupobj);
            // let allcArray = cArray;
            // console.log(cArray)
            // make some change according to user's post 
            let i = cArray.findIndex(x => x.channelid == channelobj.channelid);
            // console.log(cArray[i])
            // console.log('before: '+ JSON.stringify(cArray));
            // if exist delete user
            // console.log(cArray)
            if(i > -1){
                if (cArray.find(x => x == cArray[i])) {
                    cArray.splice(cArray.findIndex(x => x == cArray[i]), 1);
                 }
                 console.log(cArray)
                // cArray.pop(cArray[i]);
                // console.log('after: '+ JSON.stringify(cArray[i]));
                userData = {cArray};
                userData['ok']=true;
                userData['message']='Channel Deleted';
                // console.log('success'+userData);
                // console.log(userData.ok + userData.cArray)
            } else {
                userData['ok']=false;
                userData['message']='Group Not Exist';
                // console.log('failed'+userData);
            }

            // send response to user
            res.send(userData);
            // save the file of user list
            let cArrayjson = JSON.stringify(cArray);
            fs.writeFile('./data/channel.json', cArrayjson, 'utf-8', function(err) {
                if (err) throw err;
            });
        });
    } else {
        userData['ok']=false;
        userData['message']='Group or Channel not found';
    }
}