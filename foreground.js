
/* implementation idea: "changes page" by setting all 
 * other page's div's to display:none
 * it might make things easier if we wrap it all in a <ul>,
 * with each page's div as an item inside this list
 *
 * then to use this function for a button: 
 * let button = document.getElementById("my_cool_button")
 * button.addEventListener('click', changePage);
 * 
 */
function changePage(target_page){
}




/* Symptoms page
 * upon submit, get all values in the accordian and change page to Journal
 */
function saveSymptomsForm(event){
	event.preventDefault();
	
	// scraping a dynamic list might be a pain in the ass
	// jquery might help, groan
	changePage("journal")
}
let symptoms_form = document.getElementById('symptoms_form')
symptoms_form.addEventListener('submit', saveSymptomsForm);




/* Journal page
 * upon submit, get text and change page to home
 */
function saveJournalForm(event){
	event.preventDefault();
	var text = event.target.children.journal_text.value

	// todo: save data alongside date/time
	chrome.storage.sync.set({ text });
	changePage("home")	
}
let journal_form = document.getElementById('journal_form')
journal_form.addEventListener('submit', saveJournalForm)
