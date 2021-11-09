

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

