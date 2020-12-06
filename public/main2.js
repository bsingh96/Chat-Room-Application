
const socket = io(); // open up a socket to listen and send messages through



//function to return to main page
function leaveChat(){
    window.location.href ="index.html";
}
// get the username and room number from local storage
var username = localStorage.getItem("Name")
var room = localStorage.getItem("Room")

socket.emit('joinRoom',({username,room}))// send the username and room to the server



function submit1(){// function to send results 
// set the innerhtml of the div to empty after each message is sent

const messageSent =  username + ":"+ (document.getElementById("messageSent1").value ) ;// create message to be sent to the server


// emit message back to the server 
socket.emit('ChatMessage1' ,  messageSent  );
document.getElementById("messageSent1").innerHTML = "";// clear up the inputbox after

}

  // listen on the socket for any incoming messages 
  socket.on('messages', message2 => {
    if(message2 == "Server Closing....."){
        alert("Server Closing...... Terminating all chats and Redirecting.");
        window.location.href = "index.html";
       
    }else {
    // use dom to add the incoming message into the div 
    var div1 = document.getElementById("messages1");
    var textholder = document.createElement("p");
    textholder.style.marginTop = "30px"
    var text = document.createTextNode( message2);
    textholder.appendChild(text);
    div1.appendChild(textholder);
    }
  }); 

  
 
