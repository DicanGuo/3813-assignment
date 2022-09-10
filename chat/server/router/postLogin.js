var fs = require('fs');

module.exports = function(req, res) {
    var u = req.body.username;
    var p = req.body.email;
    c = u + p;
    console.log(c);
    if(u & p){
        fs.readFile('./data/users.json', 'utf8', function(err, data) {
            // the above path is with respect to where we run server.js
            if (err) throw err;
            let userArray = JSON.parse(data);
            // console.log('user Array' + userArray);
            let i = userArray.findIndex(user =>
                ((user.username == u) && (user.email == p)));
                // console.log(i);
            if (i == -1) {
                res.send({
                    "ok": false
                });
            } else {
                fs.readFile('./data/extendedUsers.json', 'utf8', function(err, data) {
                    // the above path is with respect to where we run server.js
                    if (err) throw err;
                    let extendedUserArray = JSON.parse(data);
                    let i = extendedUserArray.findIndex(user =>
                        ((user.username == u)));
                    let userData = extendedUserArray[i];
                    userData["ok"] = true;
                    // console.log('login:' + userData);
                    if(userData.role == 'super'){
                        let postData = {userData, userArray, extendedUserArray}
                        res.send(postData);
                    } else {
                        res.send(userData);
                    }
                })
    
            }
        });
    } else {
        res.send({
            "ok": false
        });
    }
}