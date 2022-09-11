var fs = require('fs');

module.exports = function(req, res) {
    let userobj = {
        "userid": null,
        "username": req.body.username,
        "role": req.body.role,
        "email": req.body.email
    }
    let userobj2 = {
        "userid": null,
        "username": req.body.username,
        "role": req.body.role,
    }
    let uArray = [];
    let loginArray = [];
    let userData = {};
    // console.log('before: '+userData.ok);
    // find user and write to JSOn if not exist
    if(userobj.username != '' & userobj.role !='' & userobj.email !=''){
        fs.readFile('./data/extendedUsers.json', 'utf8', function(err, data) {
            //open the file of user list
            if (err) throw err;
            uArray = JSON.parse(data);
            // console.log(userobj);
            // let alluArray = uArray;
            // console.log(alluArray)
            // make some change according to user's post 
            let i = uArray.findIndex(x => x.username == userobj2.username);
            let idlist = [];
            if (i == -1) {
                for(j in uArray){
                    idlist.push(j.userid);
                    // console.log(idlist)
                }
                for(k=0; k < (idlist.length+2); k++){
                    // console.log(k)
                    if(!(k in idlist)){
                        userobj2.userid = k;
                        break
                    }
                }
                uArray.push(userobj2);
                userData = {uArray};
                userData['ok']=true;
                userData['message']='User successfully created';
                console.log(userData);
       
                res.send(userData);
            } else {
                userData['ok']=false;
                userData['message']='User already exists';

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
        // find user and write to authentication JSON (username & email)
        fs.readFile('./data/users.json', 'utf8', function(err, data) {
            //open the file of user list
            if (err) throw err;
            loginArray = JSON.parse(data);
            // console.log(loginArray);
            // allLoginArray = loginArray;
            // console.log(allLoginArray)
            // make some change according to user's post 
            let i = loginArray.findIndex(x => x.username == userobj.username);
            let newUser = {username: userobj.username, email: userobj.email};
    
            if (i == -1) {
                loginArray.push(newUser);
            } else {
                userData['ok']=false;
            }
    
            // send response to user
            // res.send(uArray);
            // save the file of user list
            let uArrayjson = JSON.stringify(loginArray);
            fs.writeFile('./data/users.json', uArrayjson, 'utf-8', function(err) {
                if (err) throw err;
            });
        });
    // if input is empty
    } else {
        let userData = {'ok':false, 'message':'Input cannot be empty'};
        // console.log(userData);
        // console.log(this.userData);
        res.send(userData);
    }

}