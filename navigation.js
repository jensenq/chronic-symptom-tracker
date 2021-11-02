function clickHandler() {//handles event. simply change html page for the window
   window.location.href = "test2.html";
}
//code to construct what html page you go to according to button name. not used at the moment
/*var arrButtons = document.getElementsByTagName("button");
for(let button in arrButtons){
	document.getElementById(button.id).addEventListener('click", clickHandler);
}
for(let i = 0; i < arrButtons.length; i ++){
	arrButtons[i].addEventListener('click', clickHandler("test2"));
}*/

document.getElementById("test2").addEventListener('click',clickHandler);
