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
                        // console.log(inroomSocketarray)
                    if(socketRoom.length > 0){
                        socket.join(socketRoom);

                        console.log(socketRoom)
                        for(i=0;i<socketRoom.length;i++){
                            // console.log(socketRoom[i][0])
                            if(socketRoom[i][0] == data.name){
                                // console.log("in room")
                                // console.log('=================')    
                                socketRoom[i][1] = data.channel;
                                // console.log(socketRoom[i])
                                inroom = true;
                            }
                        }
                        
                    }else{
                        socketRoom.push([data.name,data.channel])
                    // console.log(socketRoom)

                    }


                    if(inroom == false){
                        socketRoom.push([data.name,data.channel])
                    }
                    // console.log(socketRoom)

                    io.in(data.channel).emit("notice","A new user has joined")
                    return io.in(data.channel).emit('joined',data.channel);  
            });
        });
    }
}