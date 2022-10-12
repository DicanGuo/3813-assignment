module.exports = {
    connect: function(io, PORT){
        io.on('connection', (socket)=>{
            console.log('user connection on port '+PORT+ ' : ' + socket.id);
            socket.on('message', (message)=>{
                io.emit('message', message);
            })

            socket.on('joinchannel',(channel)=>{
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
                            var hasroomnum = false;

                            for(let j=0;j<socketRoomnum.length;j++){
                                if(socketRoomnum[j][0]==channel){
                                    socketRoomnum[i][1] = socketRoomnum[i][1] + 1;
                                    hasroomnum = true;
                                }
                            }
                            if(hasroomnum == false){
                                socketRoomnum.push([channel,1])
                            }
                        }
                        chat.in(channel).emit("notice","A new user has joined")
                    });
                    return chat.in(channel).emit('joined',channel);  
            });
        });
    }
}