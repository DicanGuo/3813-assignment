var fs = require('fs');

module.exports = function(req, res) {
    let groupobj = {
        "groupid": req.body.groupid,
        "groupusers": req.body.groupusers,
        "groupassis": req.body.groupassis
    }
    let uArray = [];
    fs.readFile('./data/group.json', 'utf8', function(err, data) {
        //open the file of user list
        if (err) throw err;
        uArray = JSON.parse(data);
        console.log(groupobj);
        // make some change according to user's post 
        // let i = uArray.findIndex(x => x.groupid == groupobj.groupid);
        // if (i == -1) {
        //     uArray.push(groupobj);
        // } else {
        //     uArray[i] = groupobj;
        // }
        // send response to user
        console.log(uArray);
        res.send(uArray);
        // save the file of user list
        let uArrayjson = JSON.stringify(uArray);
        fs.writeFile('./data/group.json', uArrayjson, 'utf-8', function(err) {
            if (err) throw err;
        });
    });
}