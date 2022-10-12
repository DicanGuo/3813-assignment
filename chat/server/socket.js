module.exports = {
    connect: function(io, PORT,socketRoom,channels){
        console.log(socketRoom)
        io.on('connection', (socket)=>{
            console.log('user connection on port '+PORT+ ' : ' + socket.id);
            socket.on('message', (message)=>{
                io.emit('message', message);
            })

            socket.on('joinchannel',(channel)=>{
                console.log(socket.id)

                    socket.join(channel,()=>{
                        var inroomSocketarray =false;
                        for(i=0;i<socketRoom.length;i++){
                            if(socketRoom[i][0] == socket.id){
                                socketRoom[i][1] = channel;
                                inroom = true;
                            }
                        }
                        if(inroomSocketarray == false){
                            socketRoom.push([socket.id,channel])
                            for(let j=0;j<socketRoomnum.length;j++){
                                if(socketRoomnum[j][0]==channel){
                                }
                            }
                        }
                        io.in(channel).emit("notice","A new user has joined")
                    });
                    return io.in(channel).emit('joined',channel);  
            });
        });
    }
}