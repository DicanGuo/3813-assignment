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
            idlist.push(cArray[i])
        }
        console.log(idlist);
        console.log("=============================");

        res.send(cArray);
        // save the file of user list
        let uArrayjson = JSON.stringify(cArray);
        // fs.writeFile('./data/group.json', uArrayjson, 'utf-8', function(err) {
        //     if (err) throw err;
        // });
    });
}