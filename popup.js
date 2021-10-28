
/* reference code, will not be in our project.
 * gets that HTML element whose ID is "some_cool_text" , and updates
 * the text its currently displaying to whatever value data_from_storage is.
 */
function update_UI_data_from_storage() {
  chrome.storage.sync.get("data_from_storage", function(items) {

    if (!chrome.runtime.error) {
      document.getElementById("some_cool_text").innerText = items.data_from_storage;
    }
    else {
      console.log("Runtime error.");
    }
  });
}

document.body.onload = function() {
	update_UI_data_from_storage();
}

/* reference code, will not be in our project.
 * sets a listener for the HTML button I named "example_set_btn".
 * this listener is a function that is called when the button is clicked.
 * it gets the text inside the HTML text element which I named "text_input"
 * and sets data_from_storage to that. this value is now permanently changed 
 * in storage.
 */
document.getElementById("example_set_btn").onclick = function() {

  var text_input = document.getElementById("text_input").value;
  chrome.storage.sync.set({ "data_from_storage" : text_input }, function() {
  update_UI_data_from_storage();
  console.log("set data_from_storage to: ", text_input);

  if (chrome.runtime.error) {
      console.log("Runtime error.");
  }

  });
  //window.close();
}


// reference code

// When the button is clicked, inject setPageBackgroundColor into current page
/*
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}
*/
