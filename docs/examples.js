/* examples.js
 * use this to save examples of code snippets for later reference
 */


/****************************************************************/


// example of storing a key-value (i think that's whats happening here at least)
let color = '#3aa757';
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
});


/****************************************************************/


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


/****************************************************************/

let page = document.getElementById("buttonDiv");
let selectedClassName = "current";
const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];

// Reacts to a button click by marking the selected button and saving
// the selection
function handleButtonClick(event) {
  // Remove styling from the previously selected color
  let current = event.target.parentElement.querySelector(
    `.${selectedClassName}`
  );
  if (current && current !== event.target) {
    current.classList.remove(selectedClassName);
  }

  // Mark the button as selected
  let color = event.target.dataset.color;
  event.target.classList.add(selectedClassName);
  chrome.storage.sync.set({ color });
}

// Add a button to the page for each supplied color
function constructOptions(buttonColors) {
  chrome.storage.sync.get("color", (data) => {
    let currentColor = data.color;
    // For each color we were provided…
    for (let buttonColor of buttonColors) {
      // …create a button with that color…
      let button = document.createElement("button");
      button.dataset.color = buttonColor;
      button.style.backgroundColor = buttonColor;

      // …mark the currently selected color…
      if (buttonColor === currentColor) {
        button.classList.add(selectedClassName);
      }

      // …and register a listener for when that button is clicked
      button.addEventListener("click", handleButtonClick);
      page.appendChild(button);
    }
  });
}

// Initialize the page by constructing the color options
constructOptions(presetButtonColors);


/****************************************************************/



/* reference code, will not be in our project.
 * gets that HTML element whose ID is "some_cool_text" , and updates
 * the text its currently displaying to whatever value data_from_storage is.
 */
function update_UI_from_storage() {
	chrome.storage.sync.get("data_from_storage", function(items) {
	if (!chrome.runtime.error) {
		
		//document.getElementById("some_cool_text").innerText = items.data_from_storage;
		console.log("updating UI from storage");


	}else{console.log("Runtime error.");}});
}

document.body.onload = function() {
	update_UI_from_storage();
}

/* reference code, will not be in our project.
 * sets a listener for the HTML button I named "example_set_btn".
 * this listener is a function that is called when the button is clicked.
 * it gets the text inside the HTML text element which I named "text_input"
 * and sets data_from_storage to that. this value is now permanently changed 
 * in storage.
 */
/*
document.getElementById("example_set_btn").onclick = function() {

  let text_input = document.getElementById("text_input").value;
  chrome.storage.sync.set({ "data_from_storage" : text_input }, function() {
  update_UI_data_from_storage();
  console.log("set data_from_storage to: ", text_input);

  if (chrome.runtime.error) {
      console.log("Runtime error.");
  }

  });
  //window.close();
}
*/

