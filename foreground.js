

window.onload = function() {
 	let input_form = document.getElementById('input_form');
	input_form.addEventListener('submit', function(e){
		e.preventDefault();
		
		var journal_text = e.target.children.journal_text.value
		console.log(journal_text)
		
		var slider_val = e.target.children.example_slider.value
		console.log(slider_val)
		
    })   
}

/*
// when the submit button is clicked, do stuff.
document.addEventListener('DOMContentLoaded', function() {
	let input_form = document.getElementById('input_form');
	input_form.addEventListener('submit', function(e){
		e.preventDefault();
		
		var journal_text = e.target.children.journal_text.value
		console.log(journal_text)
		
		var slider_val = e.target.children.example_slider.value
		console.log(slider_val)
		
    })
}, false);
*/

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

