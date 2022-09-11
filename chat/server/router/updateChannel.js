var fs = require('fs');

module.exports = function(req, res) {
    let addUser = {
        "username": req.body.addUser,
    }
    let channelobj = {
        "channelid": Number(req.body.channel.channelid),
        "cgid":req.body.channel.cgid,
        "channelusers": req.body.channel.channelusers
    }
    let cArray = [];
    let uArray = [];
    let userData = {};
    // console.log(addUser.username)
    // console.log(typeof(addUser.username))

    if(addUser.username != ''){
        // console.log(typeof(addUser.username), addUser.username)
        // console.log(channelobj)
        // console.log(channelobj.channelusers)
        fs.readFile('./data/extendedUsers.json', 'utf8', function(err, data) {
            uArray = JSON.parse(data);
            console.log(uArray)
            console.log(typeof(addUser.username)+addUser.username)

            let count = 0;
            for(i in uArray){
                if(addUser.username == uArray[i].username){
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
                                if(cArray[k].channelusers[i] == addUser.username){
                                    userData={cArray};
                                    userData['ok']=false;
                                    userData['message']='user already in channel'
                                } else {
                                    cArray[k].channelusers.push(addUser.username);
                                    userData={cArray};
                                    userData['ok']=true;
                                    userData['message']='user added to channel'
                                }
                            }
                        } else {
                            cArray[k].channelusers.push(addUser.username);
                            userData={cArray};
                            userData['ok']=true;
                            userData['message']='user added';
                        }
                    } else {
                        userData={cArray};
                        userData['ok']=false;
                        userData['message']='channel not exist'
                    }        
                    res.send(userData);
                    // save the file of user list
                    let uArrayjson = JSON.stringify(cArray);
                    fs.writeFile('./data/channel.json', uArrayjson, 'utf-8', function(err) {
                        if (err) throw err;
                    });
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