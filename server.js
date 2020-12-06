const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');



const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
//var user = []
//var room = []
app.use(express.static(path.join(__dirname, 'public')));
var username = [];
  var chatname = [];
  var count=0;
app.put('/api/user', (req,res)=>{
  
   name= req.query.name,
   room=req.query.room
   username.push(name);
   chatname.push(room);
   console.log(username);
   console.log(chatname);
   count= count+1;
   res.send("ok");

})

//

const botName = 'ChatCord Bot';
// const userInfo = {
//   userID = socket.userID
// }

//run when client connects

io.on('connection', socket => {
    
    console.log("Connecting user.....")
    //welcome current user
    socket.emit('message', 'welcome to 4 Forks and 4 Engineers ChatRoom');

    //Broadcast when user connects
    console.log(count);
 
 
    socket.broadcast.emit('message',    'A User has joined the chat' );
    
    
    //count++;
   //run when client disconnects
   
  socket.on('disconnect',()=>{
    socket.broadcast.emit('message',  'User has disconnected');
  })

  //Listen to chat message
  socket.on('ChatMessage', userMessage =>{
    console.log(userMessage);
    io.emit('message', userMessage);
  })
})




const PORT =  3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
