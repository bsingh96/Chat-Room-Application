const path = require('path')//import path to help us connect all files together 
const http = require('http'); //import http to connect backend with front end
const express = require('express'); //importing expressJS to handle server side processing
const socketio = require('socket.io');//import scocket.io to handle server and clients
require('http-shutdown').extend();// import http shutdown 


const app = express(); //start the app using express
const server = http.createServer(app).withShutdown(); // creating a server using http and we use withshutdown() to help us terminate the server
const io = socketio(server);// this is how we create a socket to listen for incoming messages


app.use(express.static(path.join(__dirname, 'public')));// require the app to use public folder


var sockets = {}, nextSocketId = 0;//  object to store the socketIDs for the users connected

io.on('connection', socket => {

 
   var socketId = nextSocketId++; // declare socketID to be an increment of the nextSocketID
  sockets[socketId] = socket;
  socket.on('joinRoom', ({ username, room }) => {// listen for a user to join the chat room
    
    console.log (username + " "+  room)// print a message saying in which chat room a user has joined

    socket.join(room)

    if(room == "Chat 1"){ //if the room the user entered is chat room number 1
    socket.emit('message', 'Welcome to 4 Forks and 4 Engineers Chat Server ' );//shows a welcome message to all users who entered chat room
    socket.on('disconnect',()=>{
      socket.broadcast.to(room).emit('message', username + ' has left the chat');//when a user leaves the chat room, all other users in the room will see the user who left the room
      delete sockets[socketId];// terminate the socket associated to the user 
      console.log('socket', socketId, 'closed');// print message
    })
    socket.broadcast.to(room).emit('message',  username + ' has entered the chat' );//when a user enters the chat, all other users in the same room will see who enters after them 
    } else{// applies for chat room number 2
      socket.emit('messages', 'Welcome to 4 Forks and 4 Engineers Chat Server ' );
      socket.broadcast.to(room).emit('messages',  username + ' has entered the chat' );
      socket.on('disconnect',()=>{
        socket.broadcast.to(room).emit('messages', username + ' has left the chat');
        delete sockets[socketId];
        console.log('socket', socketId, 'closed');
       
      })
    }
    
  
  })
   

  //Listen to chat message from chat room 1 
  socket.on('ChatMessage', userMessage =>{
    console.log(userMessage);
    io.emit('message', userMessage);
   
    newMessage = userMessage.split(':')[1]// split the message at colon and take the message on the 1st index
   // console.log(newMessage);
    if(newMessage == "done"){// check if the incoming message is a server shutdown command
      io.emit('message', "Server Closing.....");// alert users that the server is closing
      io.emit('messages', "Server Closing.....");// alert users that the server is closing
     
      
  // terminate all and any open sockets to clean up
    for (var socketId in sockets) {// loop through the object to close all sockets active 
    delete sockets[socketId];// terminate open sockets
    console.log('socket', socketId, 'terminated');// print message 
   
  }
   
   closeServer();// call close server function
    async function closeServer(){//  function to close server 

    await new Promise(r => setTimeout(r, 3000));// set timeout to alert users
    server.shutdown();// use .shutdown function to clean up any running processes
    }
    }
  }) 

  
  socket.on('ChatMessage1', userMessage1 =>{ // listen for Chat Message one and recieve user message
    console.log(userMessage1);// display user message on server side
    io.emit('messages', userMessage1);// send back the user 
   
    usermessage = userMessage1.split(':')[1] // since the sent message includes of 
    // a user name , we must seperate it using .split method to retrieve the message sent by user
  
    if(usermessage == "done"){// checks if the user message sent is the termination command
    io.emit('messages', "Server Closing.....");// alerts both chatrooms that server is shutting down
    io.emit('message', "Server Closing.....");
      //socket.disconnect();
      
  // close all open sockets , terminating all connected user
    for (var socketId in sockets) {// for the socketIDs stored in the array we loop through and close 
      //all open sockets
    delete sockets[socketId];
    console.log('socket', socketId, ' is now terminated');// print which socket is closed
    }
   
    console.log("Server Closing......")// print server closing message
    closeServer();// call server close function
    async function closeServer(){ // async function to shut down the server gracefully
     //sleep(2000);
    await new Promise(r => setTimeout(r, 3000));// timeout for the shutdown to allow user alerts to show
    server.shutdown(); // terminates all processes related to the server 
    }
    }
   
  }) 

})




const PORT =  3000; // port number declaration 

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));// display message 
