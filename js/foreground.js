
class Entry {
	constructor(date, overall_score, symptoms, journal){
		this.date = date;
		this.overall_score = overall_score;
		this.symptoms = symptoms;
		this.journal = journal;
		}
}

class Symptom {
	constructor(title, score, descriptors){
		this.title = title;
		this.score = score;
		this.descriptors = descriptors;
	}
}

class Descriptor{
	constructor(title, score){
		this.title = title;
		this.score = score;
	}
}



/* all startup tasks here */
window.onload = function(){
	changePage("home"); 
	setChangePageEvents();
}

function get_todays_date(){
	return (new Date()).toISOString().slice(0,10).replace(/-/g,"").toString();
}


/* gets data from html and records all symptom/descriptor:intensity pairs in a dictionary.
 * this is then stored, keyed by the date in YYYYMMDD format (eg: nov 11th 2021 -> 20211124) 
 * this data can later be accessed with chrome.storage.sync.get(['20211124'] ...)
 *
function saveEntryData(){

	var overall_slider = document.getElementById("overall_slider");
	var symptom_titles  = document.getElementsByClassName("symptom_title");
	var symptom_sliders = document.getElementsByClassName("symptom_slider");
	var descriptor_titles  = document.getElementsByClassName("descriptor_title");
	var descriptor_sliders = document.getElementsByClassName("descriptor_slider");

	var entry_dict = {};
	entry_dict["overall"] = overall_slider.value;

	for (var i=0; i<symptom_titles.length; i++){
		var symptom = symptom_titles[i].innerText.replace(/\s/g, "")
		var intensity = symptom_sliders[i].value;
		entry_dict[symptom] = intensity;
	}
	for (var i=0; i<descriptor_titles.length; i++){
		var descriptor = descriptor_titles[i].innerText.replace(/\s/g, "") 
		var intensity = descriptor_sliders[i].value;
		entry_dict[descriptor] = intensity;
	}

	var todays_date = get_todays_date(); 
	chrome.storage.sync.set({[todays_date] : entry_dict});

	saveSymptomsHierarchy();

}
*/

function saveSymptoms(){

	let boxes = document.getElementsByClassName("sym_des_box");

	var symptoms = [];
	for (const box of boxes){

		var d_boxes = box.querySelectorAll('.d_box');
		var descriptors = [];
		for (const d_box of d_boxes){
			var title = d_box.querySelector('.descriptor_title').textContent
			var score = d_box.querySelector('.descriptor_slider').value;
			descriptors.push(new Descriptor(title, score));
		}
		
		var title = box.querySelector('.symptom_title').textContent;
		var score = box.querySelector('.symptom_slider').value;
		symptoms.push(new Symptom(title, score, descriptors));
	}
	
	var todays_date = get_todays_date(); 
	var overall = document.getElementById("overall_slider").value;
	let entry = new Entry(todays_date, overall, symptoms, "");

	chrome.storage.sync.set({[todays_date] : entry});
	chrome.storage.sync.set({["hierarchy"] : entry});
}


function viewTodaysEntry(){
	changePage("summary");

	document.querySelector('#date').textContent = get_american_day(); 

	var todays_date = get_todays_date(); 
	chrome.storage.sync.get([todays_date], function(result){
		var entry = result[todays_date];
		var entry_data_UL = makeSummaryUL(entry);
		var j_text = entry.journal;

		document.getElementById("entry_data").replaceWith(entry_data_UL);
		document.querySelector('#journal_data').textContent = j_text; 
	});
}


/* upon submit, save text, update the entry, go to home page
 */
function saveJournalForm(event){
	event.preventDefault();
	var text = event.target.children.journal_text.value

	var todays_date = get_todays_date(); 
	chrome.storage.sync.get([todays_date], function(result){
		var entry = result[todays_date];
		entry.journal = text;
		chrome.storage.sync.set({[todays_date] : entry});
	});

	entryCounter();
	changePage("home")	
}




/* increases the counter keeping track of number of jounral entries by 1
*/
function entryCounter(){
	var counter = 0;


	chrome.storage.sync.get('totalEntries', function(result){
			counter = result.totalEntries;
			counter ++;
			//console.log("parsed");
			//console.log(counter);
			chrome.storage.sync.set({"totalEntries" : counter}, function(){
			});
	});
	
}


/* makes a <ul> from the symptoms and descriptors for an entry in the same hierarchical structure
 */
function makeSummaryUL(entry) {

	var s_ul = document.createElement('ul');
	var overall_li = document.createElement('li');
	overall_li.appendChild(document.createTextNode("Overall: " + entry.overall_score));
	s_ul.appendChild(overall_li);

	for (const symp of entry.symptoms) {

		var d_ul = document.createElement('ul');
		for (const desc of symp.descriptors) {
			var d_li = document.createElement('li');
			d_li.appendChild(document.createTextNode(desc.title + ": " + desc.score));
			d_ul.appendChild(d_li);
		}
		var s_li = document.createElement('li');
		s_li.appendChild(document.createTextNode(symp.title + ": " + symp.score));
		s_ul.appendChild(s_li);
		s_ul.appendChild(d_ul);
		
    }
    return s_ul;
}



/* "changes page" by setting all 

 * other page's div's to display:none
 */
function changePage(target_page){
	var page_ids = ["home", "symptoms", "journal", "profile", "create_profile", "milestones", "summary"]
	for (const page_id of page_ids) {
		if (page_id != target_page){
			document.getElementById(page_id).style.display = 'none';
		}
	}
	document.getElementById(target_page).style.display = 'block';

}

function setChangePageEvents(){
	document.getElementById("to_home")       .addEventListener('click', function(){changePage("home")});
	document.getElementById("to_symptoms")   .addEventListener('click', function(){changePage("symptoms")});
	document.getElementById("to_profile")    .addEventListener('click', function(){changePage("profile")});
	document.getElementById("to_milestones") .addEventListener('click', function(){changePage("milestones")});
	document.getElementById("to_summary")    .addEventListener('click', function(){viewTodaysEntry()});
	document.getElementById("symptoms_to_journal").addEventListener('click', function(){saveSymptoms(); changePage("journal");});
	document.getElementById("journal_to_home")    .addEventListener('click', function(){changePage("home") });
	document.getElementById("to_create_profile")  .addEventListener('click', function(){changePage("create_profile")});
	document.getElementById('today_cal')          .addEventListener('click', function(){viewTodaysEntry() }); 
	document.getElementById('journal_form')       .addEventListener('submit', saveJournalForm)

}


/* accordian logic */
$(document).ready(function(){
	    var counter = 1;
	    var wrapper = $("#accordion");
	
		 $("#addButton").on("click", function(e){ 
	    	e.preventDefault();
	    	var catgName = prompt("Type the name of your symptom");
			if(catgName == ''){
				catgName = 'Catg#'+counter;
			}
			if(catgName != null){
				var ariaExpanded = false;
				var expandedClass = '';
				var collapsedClass = 'collapsed';
				if(counter==1){
					  ariaExpanded = true;
					  expandedClass = 'in';
					  collapsedClass = '';
				}
				$(wrapper).append('<div class="sym_des_box col-sm-12" style="margin-bottom: 0;"><div class="panel panel-default" id="panel'+ counter +'">' + 
				'<div class="panel-heading" role="tab" id="heading'+ counter +'"><h4 class="panel-title">' +
				'<a class="symptom_title '+collapsedClass+'" id="panel-lebel'+ counter +'" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse'+ counter +'" ' +
				'aria-expanded="'+ariaExpanded+'" aria-controls="collapse'+ counter +'"> '+catgName+
				'<input  type="range" class="slider symptom_slider" min="1" max="100" value="50"><br>'+' </a><div class="actions_div" style="position: relative; top: -26px;">' +
				'<a href="#" accesskey="'+ counter +'" class="remove_ctg_panel exit-btn pull-right"><span class="glyphicon glyphicon-remove"></span></a>' +
				'<a href="#" accesskey="'+ counter +'" class="edit_ctg_label pull-right"><span class="glyphicon glyphicon-edit "></span> Edit</a>' +
				'<a href="#" accesskey="'+ counter +'" class="pull-right" id="addButton2"> <span class="glyphicon glyphicon-plus"></span> Add descriptors </a></div></h4></div>');
				counter++;
			}
			
	     });
		 
		var x = 1; 
	     $(wrapper).on("click","#addButton2", function(e){
	         e.preventDefault();
			 var parentId = $(this).attr('accesskey');
			 var parentPanel = '#panel'+ parentId;
			 var catgName = prompt("Please Add your category name");
			 if(catgName == ''){
				catgName = ' P#'+parentId+' Catg#'+counter;
			 }
			if(catgName != null){
				var ariaExpanded = false;
				var expandedClass = '';
				var collapsedClass = 'collapsed';
			
				$(wrapper).find(parentPanel).append('<div class="d_box col-sm-12" style="margin-bottom: 0;"><div class="panel panel-default" id="panel'+counter+'">' + 
				'<div class="panel-heading" role="tab" id="heading'+counter+'"><h4 class="panel-title">' +
				'<a class="descriptor_title '+collapsedClass+'" id="panel-lebel'+ counter +'" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse'+ counter+'" ' +
				'aria-expanded="'+ariaExpanded+'" aria-controls="collapse'+ counter+'"> '+catgName+
				'<input  type="range" class="slider descriptor_slider" min="1" max="100" value="50"><br>'+' </a><div class="actions_div" style="position: relative; top: -26px;">' +
				'<a href="#" accesskey="'+counter +'" class="remove_ctg_panel exit-btn pull-right"><span class="glyphicon glyphicon-remove"></span></a>' +
				'<a href="#" accesskey="'+ counter +'" class="edit_ctg_label pull-right"><span class="glyphicon glyphicon-edit"></span> Edit</a>' +
				'<a href="#" accesskey="'+ counter +'" class="pull-right" id="addButton2">  </a></h4></div>');
				
				x++;
				counter++;
			}
			
	     });
		 
	     $(wrapper).on("click",".remove_ctg_panel", function(e){ 
				 e.preventDefault(); 
				 var accesskey = $(this).attr('accesskey');
		        $('#panel'+accesskey).remove();
				counter--;
				x--;
	     });
	     
		 
		 
		 
	     var y = 1; 
	     $(wrapper).on("click","#addButton3", function(e){
	         e.preventDefault();
			 var accesskey = $(this).attr('accesskey');
			 y++; 
			 $('#panel'+accesskey).find('#TextBoxDiv'+accesskey).append('<div class="col-md-12 form-group"><input type="text" name="ctgtext[]" class="form-control" style="width: 40%;float: left;"/><a href="#" class="remove_field exit-btn"><span class="glyphicon glyphicon-remove"></a></div>');
	        
	     });
	     
	     $(wrapper).on("click",".remove_field", function(e){
	         e.preventDefault(); 
	     	$(this).parent('div').remove();y--;
	     })
	  	
	     $(wrapper).on("click",".edit_ctg_label", function(e){ 
	    	 var panelId = $(this).attr('accesskey');
			 var catgName = prompt("Change the symptom name");
			 if(catgName == ''){
				   return false;
			 }
			 if(catgName != null){
				 $('#panel'+panelId).find("#panel-lebel"+panelId).html('').html(catgName+'<input  type="range" class="slider symptom_slider" min="1" max="100" value="50">');
			 }
				
			
     });
  });

function get_american_day(){
	// show todays date in month-dd-yyyy form
	const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
	const dateObj = new Date();
	const month = monthNames[dateObj.getMonth()];
	const day = String(dateObj.getDate()).padStart(2, '0');
	const year = dateObj.getFullYear();
	return month  + '\n'+ day  + ',' + year;
}
