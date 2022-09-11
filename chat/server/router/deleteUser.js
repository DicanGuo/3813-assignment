var fs = require('fs');

module.exports = function(req, res) {
    let userobj = {
        "userid": req.body.userid,
        "username": req.body.username,
        "role": req.body.role,
        "email": req.body.email
    }
    let uArray = [];
    let loginArray = [];
    let userData = {};
    // console.log('before: '+userData.ok);
    // find user and write to JSOn if not exist
    if(userobj.username != ''){
        fs.readFile('./data/extendedUsers.json', 'utf8', function(err, data) {
            //open the file of user list
            if (err) throw err;
            uArray = JSON.parse(data);
            // console.log(userobj);
            // let alluArray = uArray;
            // console.log(alluArray)
            // make some change according to user's post 
            let i = uArray.findIndex(x => x.username == userobj.username);
            let idlist = [];
            // console.log('before: '+ JSON.stringify(uArray));
            // if exist delete user
            if(i > -1){
                // uArray.pop(uArray[i]);
                if (uArray.find(x => x == uArray[i])) {
                    uArray.splice(uArray.findIndex(x => x == uArray[i]), 1);
                 }
                // console.log('after: '+ JSON.stringify(uArray));
                userData = {uArray};
                userData['ok']=true;
                userData['message']='User Deleted';
                console.log('success'+userData);
                res.send(userData);

            } else {
                userData['ok']=false;
                userData['message']='User Not Exist';
                console.log('failed'+userData);
                res.send(userData);
            }

            // send response to user
            // res.send(uArray);
            // save the file of user list
            let uArrayjson = JSON.stringify(uArray);
            fs.writeFile('./data/extendedUsers.json', uArrayjson, 'utf-8', function(err) {
                if (err) throw err;
            });
        });
    }
}