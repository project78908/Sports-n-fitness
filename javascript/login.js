function validation(){
    var name = document.getElementById('name').value;
    var password = document.getElementById('password').value;
    var password2 = document.getElementById('password2').value;
    var email = document.getElementById('email').value;
    var username = document.getElementById('username').value;
    var number = document.getElementById('number').value;

if((name.length < 2)||(name.length > 20)){
document.getElementById('name1').innerHTML="**Name Length!!**";
return false;
}

if((username.length < 2)||(username.length > 10)){
    document.getElementById('username1').innerHTML="**Username Length!!**";
    return false;
    }
 if(!isNaN(name)){
    document.getElementById('name1').innerHTML="**Only Characters are Allowed!!**";
    return false;
 }  
 if((password.length <=5)||(password.length > 30)){
    document.getElementById('password1').innerHTML="**Password Not Strong!!**";
    return false;
    }
 if(number.length!=10){
    document.getElementById("number").innerHTML="**Number must be of 10 digit!!**";
    return false; 
 }
if(email.indexOf('@')<=0) {
    document.getElementById('email1').innerHTML="**@ position invalid!!**";
    return false; 
 
}   
if((email.charAt(email.length-4)!='.')&&(email.charAt(email.length-3)!='.')){
    document.getElementById('email1').innerHTML="**Email id invalid!!**";
    return false; 
 }
if(number.charAt(0)!=9){
    document.getElementById("number1").innerHTML="**Number not valid!!**";
    return false; 
 
}
 
}

var state=false;
function toogle(){
    if(state){
        document.getElementById("password").setAttribute("type","password");
      document.getElementById("eye").style.color="#7a797e";
        state=false; 
    }
    else{
        document.getElementById("password").setAttribute("type","text");
        document.getElementById("eye").style.color="#5887ef";

        state=true;
    }

}
var state2=false;
function toogle2(){
    if(state2){
        document.getElementById("password2").setAttribute("type","password");
        document.getElementById("eye2").style.color="#7a797e";

        state2=false; 
    }
    else{
        document.getElementById("password2").setAttribute("type","text");
        document.getElementById("eye2").style.color="#5887ef";

        state2=true;
    }

}