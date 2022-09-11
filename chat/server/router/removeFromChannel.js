var fs = require('fs');

module.exports = function(req, res) {
    let deleteUser = {
        "username": req.body.deleteUser,
    }
    let channelobj = {
        "channelid": Number(req.body.channel.channelid),
        "cgid":req.body.channel.cgid,
        "channelusers": req.body.channel.channelusers
    }
    let cArray = [];
    let uArray = [];
    let userData = {};
    // console.log(deleteUser.username)
    // console.log(typeof(deleteUser.username))

    if(deleteUser.username != ''){
        // console.log(typeof(deleteUser.username), deleteUser.username)
        // console.log(channelobj)
        // console.log(channelobj.channelusers)
        fs.readFile('./data/extendedUsers.json', 'utf8', function(err, data) {
            uArray = JSON.parse(data);
            // console.log(uArray)
            console.log(typeof(deleteUser.username)+deleteUser.username)

            let count = 0;
            for(i in uArray){
                if(deleteUser.username == uArray[i].username){
                    count += 1;
                }
            }
            console.log(count)
            if(count < 1){
                userData={cArray};
                userData['message']='user not exist';
                userData['ok']=false;
                res.send(userData);

            } else {
                fs.readFile('./data/channel.json', 'utf8', function(err, data) {
                    //open the file of user list
                    if (err) throw err;
                    cArray = JSON.parse(data);
                    // console.log(cArray);
                    // console.log(channelobj.channelusers.length);
                    let k = cArray.findIndex(x => x.channelid == channelobj.channelid);
                    if(k > -1){
                        if(cArray[k].channelusers.length >0){
                            for(i in cArray[k].channelusers){
                                // console.log(channelobj.channelusers[i])
                                    if (cArray[k].channelusers.find(x => x == cArray[k].channelusers[i])) {
                                        cArray[k].channelusers.splice(cArray[k].channelusers.findIndex(x => x == cArray[k].channelusers[i]), 1);
                                        userData={cArray};
                                        userData['ok']=true;
                                        userData['message']='user removed from channel'
                                    } else {
                                    userData={cArray};
                                    userData['ok']=false;
                                    userData['message']='user not in channel'
                                }
                            }
                        } else {
                            userData={cArray};
                            userData['ok']=true;
                            userData['message']='user not in channel';
                        }
                    } else {
                        userData={cArray};
                        userData['ok']=false;
                        userData['message']='channel not exist'
                    }        
                    res.send(userData);
                    // save the file of user list
                    let uArrayjson = JSON.stringify(cArray);
                    // fs.writeFile('./data/channel.json', uArrayjson, 'utf-8', function(err) {
                    //     if (err) throw err;
                    // });
                });
            }
            console.log("=============================");
        });

    } else {
        userData={cArray};
        userData['ok']=false;
        userData['message']='username is empty'
        res.send(userData);
    }
}