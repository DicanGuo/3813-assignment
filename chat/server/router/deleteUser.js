var fs = require('fs');

module.exports = function(req, res) {
    let userobj = {
        "userid": null,
        "username": req.body.username,
        "role": req.body.role,
        "email": req.body.email
    }
    let uArray = [];
    let loginArray = [];
    fs.readFile('./data/extendedUsers.json', 'utf8', function(err, data) {
        //open the file of user list
        if (err) throw err;
        uArray = JSON.parse(data);
        console.log(userobj);
        alluArray = uArray;
        console.log(alluArray)
        // make some change according to user's post 
        let i = uArray.findIndex(x => x.username == userobj.username);
        let idlist = [];

        if (i == -1) {
            for(j in uArray){
                idlist.push(j.userid);
                // console.log(idlist)
            }
            for(k=0; k < (idlist.length+2); k++){
                // console.log(k)
                if(!(k in idlist)){
                    userobj.userid = k;
                    break
                }
            }
            uArray.push(userobj);

        } else {
            uArray[i] = userobj;
        }
        if(userobj.role == 'super'){
            let usersData = {alluArray, uArray}
            res.send(usersData);
        } else {
            res.send(uArray);
        }
        // send response to user
        // res.send(uArray);
        // save the file of user list
        let uArrayjson = JSON.stringify(uArray);
        fs.writeFile('./data/extendedUsers.json', uArrayjson, 'utf-8', function(err) {
            if (err) throw err;
        });
    });

    fs.readFile('./data/users.json', 'utf8', function(err, data) {
        //open the file of user list
        if (err) throw err;
        loginArray = JSON.parse(data);
        console.log(loginArray);
        // allLoginArray = loginArray;
        // console.log(allLoginArray)
        // make some change according to user's post 
        let i = loginArray.findIndex(x => x.username == userobj.username);
        let newUser = {username: userobj.username, email: userobj.email};

        if (i == -1) {
            loginArray.push(newUser);
        } else {
            alert('User already exist')
        }

        // send response to user
        // res.send(uArray);
        // save the file of user list
        let uArrayjson = JSON.stringify(loginArray);
        fs.writeFile('./data/users.json', uArrayjson, 'utf-8', function(err) {
            if (err) throw err;
        });
    });
}