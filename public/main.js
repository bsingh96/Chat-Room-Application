

const socket = io();

//function to return to main page
function leaveChat(){
    window.location.href ="index.html";
    
}
var username = localStorage.getItem("Name")
var check = document.getElementById("messageSent").value
function submit(){
    var inputbox = document.getElementById("messageSent");
    inputbox.innerHTML = "";
  //get message text
  const messageSent = username + ": " + (document.getElementById("messageSent").value ) ;
  
  //emit message to the server
  socket.emit('ChatMessage' ,  messageSent  );
}

// displays the message sent by the server by appending into the div 
socket.on('message', message => {
 
    var div = document.getElementById("messages");
    var textholder = document.createElement("p");
    textholder.style.marginTop = "30px"
    var text = document.createTextNode( message);
    textholder.appendChild(text);
    div.appendChild(textholder);
  
  });

  
 

  /*THIS CODE HAS NOT BEEN TESTED, THIS IS FOR SHOWING THE MESSAGE THAT THE USER IS LEAVING THE CHAT. Try it out for now */
  // socket.on('disconnect', disconnect=>{
  //     console.log(disconnect);
  //     var div = document.getElementById("disconnect")
  //     var textholder = document.createElement("p")
  //       var text = document.createTextNode(message);
  //       textholder.appendChild(text);
  //       div.appendChild(textholder)
  // })


  
  //Message Submit

  //ChatForm.addEventListener('submit', (e) =>{
     // e.preventDefault();
      //)
/*
function FormatMessage(username, text){
  return{
    username,
    text
  }
}
module.exports = FormatMessage;*/

/*
  function displayMessage(){
    const displayMessage = document.createElement("div");
    displayMessage.classList.add("message")
    const p = document.createElement("p");
    p.innerText = message.username;
}
*/

/*
function showUser(){
    allUsers.innerHTML = "";
    allUser.forEach(user=>{
        const list = document.createElement("li");
        list.innerText=user.username;
        
    })
}
*/
 
