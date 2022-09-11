var fs = require('fs');

module.exports = function(req, res) {
    let groupobj = {
        "groupid": req.body.groupid,
        "groupusers": req.body.groupusers,
        "groupassis": req.body.groupassis
    }
    let channelobj = {
        "channelid": Number,
        "cgid":[],
        "channelusers": []
    }
    let cArray = [];
    let idlist = [];
    fs.readFile('./data/channel.json', 'utf8', function(err, data) {
        //open the file of user list
        if (err) throw err;
        cArray = JSON.parse(data);
        // console.log(groupobj);
        for(i in cArray){
            idlist.push(cArray[i].channelid)
        }
        console.log(idlist);
        for(j=0; j < idlist.length+1; j++){
            if(!(j in idlist)){
                channelobj.channelid = j;
            }
        }
        channelobj.cgid.push(String(groupobj.groupid));
        console.log(channelobj.channelid);
        cArray.push(channelobj);
        console.log(cArray)
        userData = {cArray};
        userData['ok']=true;
        userData['message']='channel created';
        console.log(userData)
        res.send(userData);
        console.log("=============================");

        // save the file of user list
        let uArrayjson = JSON.stringify(cArray);
        fs.writeFile('./data/channel.json', uArrayjson, 'utf-8', function(err) {
            if (err) throw err;
        });
    });
}