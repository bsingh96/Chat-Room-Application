 
 
 function chat(){// function to initiate a chat 
 
   var username = document.getElementById("selectedname").value;// get the username from inputbox
   var room = document.getElementById("selectedRoom").value;//get room name from selectbox


   localStorage.setItem("Name",username);// store the username in localstorage
   localStorage.setItem("Room",room);// store room number in localstorage

   if(room == "Chat 1"){// if the room is chat 1 , direct to appropriate html page
   window.location.href ="chatroom.html";


   }else{//if the room is chat 2 , direct to appropriate html page
   window.location.href ="chatroom2.html";
   }
}






