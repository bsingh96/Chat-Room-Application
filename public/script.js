 function chat(){
 window.location.href = "chatroom.html"
var username = document.getElementById("selectedname").value;
var room = document.getElementById("selectedRoom").value;
//var link = "/api/user?name="+username+"&room="+room;
//const response = await fetch(link,{method:"put"});
//const data = await response.json();
//if(data.message =="ok"){
   // console.log(username+room)
//}

localStorage.setItem("Name",username);
localStorage.setItem("Room",room)
}



