  const socket = io(); // open up a socket to listen and send messages through



  //function to leave the chat room 
  function leaveChat(){
    window.location.href ="index.html";
  }
  
  // get the username and room number from local storage
  var username = localStorage.getItem("Name")
  var room = localStorage.getItem("Room")

  socket.emit('joinRoom',({username,room})) // send the username and room to the server

  function submit(){// function to send results 
    var inputbox = document.getElementById("messageSent");// get the div by the id
    inputbox.innerHTML = "";// set the innerhtml of the div to empty after each message is sent
  //get message text
    const messageSent =  username + ":"+ (document.getElementById("messageSent").value ) ;
  
    socket.emit('ChatMessage' ,  messageSent  );// emit message back to the server 

  
  }


// displays the message sent by the server by appending into the div 
  socket.on('message', message => {
    console.log(message)
  if(message == "Server Closing....."){
      alert("Server Closing...... Terminating all chats and Redirecting.");
      window.location.href = "index.html";
    
  }else{
    // use dom to append message recieved into the div
      var div = document.getElementById("messages");
      var textholder = document.createElement("p");
      textholder.style.marginTop = "30px"
      var text = document.createTextNode( message);
      textholder.appendChild(text);
      div.appendChild(textholder);
  }
  });

  


  
 

 
