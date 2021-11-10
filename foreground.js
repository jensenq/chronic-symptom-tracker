
/* implementation idea: "changes page" by setting all 
 * other page's div's to display:none
 * a hard-coded list of all the page's div's id's might be needed?
 * 
 * then to change page upon some button being clicked:
 * let button = document.
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
	//console.log(text)
	chrome.storage.sync.set({ text });
	changePage("home")	
}
let journal_form = document.getElementById('journal_form')
journal_form.addEventListener('submit', saveJournalForm)
