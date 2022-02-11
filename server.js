const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, userLeave} = require('./utils/users');


const app = express();
const server = http.createServer(app);
const io = socketio(server);


// Set static folders
app.use(express.static(path.join(__dirname, 'src')));


//Run when client connects
io.on('connection',socket =>{

    socket.on('joinchat', ({n}) => {
        const user = userJoin(socket.id, n);
        // socket.join(user.username);

        socket.emit('message', formatMessage('Admin', 'Welcome to ChatApp!'));

        //Broadcast when user connects
        socket.broadcast.emit('message', formatMessage('Admin', `${n} has joined the chat`));

        //Send user info
        // io.emit('chatUsers',{
        //     users: getChatUsers(user.username)
        // });
    });

    //Listen to chatMessage
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);

        io.emit('message', formatMessage(user.username, msg));
    });

      //Runs when client disconnects
      socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if(user){
            io.emit('message', formatMessage('Admin', `${user.username} has left the chat`));
            
            //Send user info
        // io.emit('chatUsers',{
        //     users: getChatUsers(user.username)
        // });
        }
    });
});

const PORT = 3000||process.env.PORT;

server.listen(PORT, () => console.log(`Server is running at ${PORT}`));
