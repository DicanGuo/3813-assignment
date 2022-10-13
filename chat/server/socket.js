const getUsers = require("./routes/getUsers");

module.exports = {
    connect: function(io, PORT){
        // console.log(socketRoom[0][0])
        var socketRoom = [];
        io.on('connection', (socket)=>{
            console.log('user connection on port '+PORT+ ' : ' + socket.id);


            socket.on('joinchannel',(data)=>{
                // console.log(socket.id)
                // console.log(data)
                // channelString = data.toString()
                // console.log(channelString)

                socket.join(data.channel);
                        // console.log(channel);
                socket.on('message', (message)=>{
                    io.to(data.channel).emit('message', message);
                })
                var inroom =false;
                // console.log(socketRoom.length)
                    
                if(socketRoom.length > 0){
                    socket.join(socketRoom);

                    // console.log(socketRoom)
                    for(i=0;i<socketRoom.length;i++){
                        // console.log(socketRoom[i][0])
                        if(socketRoom[i][0] == data.name){
                            // console.log("in room")
                            // console.log('=================')    
                            socketRoom[i][1] = data.channel;
                            // console.log(socketRoom[i])
                            inroom = true;
                        }
                        else{
                            socketRoom.push([data.name,data.channel,socket.id])
                            console.log('NEW USER: ' + socketRoom)
                            console.log('NEW USER: ' + socketRoom.length)
                            break
                        }
                    }
                    console.log('RESULT: ' + socketRoom)
                    console.log('RESULT: ' + socketRoom.length)

                }else{
                    socketRoom.push([data.name,data.channel,socket.id])
                console.log('EMPTY: ' + socketRoom)
                console.log('EMPTY: ' + socketRoom.length)

                }


                // if(inroom == false){
                //     socketRoom.push([data.name,data.channel])
                // }
                // console.log(socketRoom)

                io.in(data.channel).emit("notice", data.name + " has joined the channel")
                // return io.in(data.channel).emit('joined',data.channel);  
            });

            socket.on('leavechannel',(data)=>{
                // io.to(data.channel).emit("notice", data.name + " has left the channel");
                io.in(data.channel).emit("notice", data.name + " has left the channel")

                for(let i=0; i<socketRoom.length; i++){
                    if(socketRoom[i][0]== data.name){
                        socketRoom.splice(i,1);
                        // return io.in(data.channel).emit('joined',data.channel);  

                        socket.leave(data.channel);
                    }
                }
                io.in(data.channel).emit("notice", data.name + " has left the channel")

            })
        });
    }
}