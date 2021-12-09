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
 */
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



function saveSymptomsHierarchy(){

	let sym_des_box  = document.getElementsByClassName("sym_des_box");
	console.log(sym_des_box);

	for (var i=0; i<sym_des_box.length; i++){
		var sym = sym_des_box[i].querySelector('.symptom_title').textContent;
		console.log(sym);

		var descriptors = sym_des_box[i].querySelectorAll('.descriptor_title');
		for (var j=0; j<descriptors.length; j++){
			console.log(descriptors[j].textContent);
		}
	}
}



function viewTodaysEntry(){
	changePage("summary");

	// show todays date in mm-dd-yyyy form
	const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
	const dateObj = new Date();
	const month = monthNames[dateObj.getMonth()];
	const day = String(dateObj.getDate()).padStart(2, '0');
	const year = dateObj.getFullYear();
	const output = month  + '\n'+ day  + ',' + year;
	document.querySelector('#date').textContent = output; 

	// get symptom data
	var todays_date = get_todays_date(); 
	chrome.storage.sync.get([todays_date], function(result){
		var tmp = makeUL(result, todays_date);
		document.getElementById("entry_data").appendChild(tmp);
	});

	// get journal data
	var key = get_todays_date()+"_journalentry";  // this is jank, dont @ me
	chrome.storage.sync.get([key], function(result){
		document.querySelector('#journal_data').textContent = result[key]; 
	});
}


/* upon submit, save text and change page to home
 */
function saveJournalForm(event){
	event.preventDefault();
	var text = event.target.children.journal_text.value

	var key = get_todays_date()+"_journalentry";  // this is jank, dont @ me
	chrome.storage.sync.set({[key] : text});
	//milestone 2: keep track of number of journal entries
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


/* makes a <ul> from the result of chrome.storage.sync.get
 */
function makeUL(result, todays_date) {
	var ul = document.createElement('ul');

	for (const [key, value] of Object.entries(result[todays_date])) {
		var li = document.createElement('li');
		li.appendChild(document.createTextNode(key + ": " + value));
		ul.appendChild(li);
    }
    return ul;
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
	document.getElementById("symptoms_to_journal").addEventListener('click', function(){saveEntryData(); changePage("journal");});
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
			
				$(wrapper).find(parentPanel).append('<div class="col-sm-12" style="margin-bottom: 0;"><div class="panel panel-default" id="panel'+counter+'">' + 
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
			 var catgName = prompt("Please Change your category name");
			 if(catgName == ''){
				   return false;
			 }
			 if(catgName != null){
				 $('#panel'+panelId).find("#panel-lebel"+panelId).html('').html(catgName);
			 }
				
			
     });
  });
