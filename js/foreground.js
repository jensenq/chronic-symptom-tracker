/* all startup tasks here */
window.onload = function(){
	changePage("home"); 
	setChangePageEvents();
	initCalHeatmap();
}

function initCalHeatmap(){

	document.getElementById("year").innerHTML = new Date().getFullYear();

	var cal = new CalHeatMap();
	var now = new Date(3600000*Math.floor(Date.now()/3600000));

	cal.init({
		itemSelector: "#cal-heatmap",
		domain: "month",
		subDomain: "x_day",
		data: "../data/test_entries.json", // todo: why isnt this right?
		//afterLoadData: parse_entry_data,
		start: now,
		cellSize: 20,
		cellPadding: 5,
		domainGutter: 20,
		range: 1,
		domainDynamicDimension: false,
		previousSelector: "#prev_month",
		nextSelector: "#next_month",
		domainLabelFormat: function(date) {
			moment.locale("en");
			return moment(date).format("MMMM").toUpperCase();
		},
		subDomainTextFormat: "%d",
		weekStartOnMonday: false,
		highlight: ["now"],
		displayLegend: false
	});
}

var parse_entry_data = function(data){
	var stats = {};
	for (var d in data) {
		console.log(d + " | " + data[d])
		stats[data[d].date] = data[d].value;
	}
	return stats;
}

function cal_onclick(date, value){
	console.log("Date: " + date + "\nValue: " +
			(value === null ? "unknown" : value));
}



/* "changes page" by setting all 

 * other page's div's to display:none
 */
function changePage(target_page){
	var page_ids = ["home", "symptoms", "journal", "profile", "create_profile", "milestones", "viz"]
	for (const page_id of page_ids) {
		if (page_id != target_page){
			document.getElementById(page_id).style.display = 'none';
		}
	}
	document.getElementById(target_page).style.display = 'block';

}

function setChangePageEvents(){
	document.getElementById("home_to_symptoms")   .addEventListener('click', function(){changePage("symptoms")});
	document.getElementById("home_to_profile")    .addEventListener('click', function(){changePage("profile")});
	document.getElementById("home_to_milestones") .addEventListener('click', function(){changePage("milestones")});
	document.getElementById("symptoms_to_journal").addEventListener('click', function(){changePage("journal")});
	document.getElementById("journal_to_home")    .addEventListener('click', function(){changePage("home") });
	document.getElementById('symptoms_form')      .addEventListener('submit', saveSymptomsForm);
	document.getElementById('journal_form')       .addEventListener('submit', saveJournalForm)
}

/* "changes page" by setting all 
 * other page's div's to display:none
 */
function changePage(target_page){
	var page_ids = ["home", "symptoms", "journal", "profile", "create_profile", "milestones", "viz"]
	for (const page_id of page_ids) {
		if (page_id != target_page){
			document.getElementById(page_id).style.display = 'none';
		}
	}
	document.getElementById(target_page).style.display = 'block';
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




/* Journal page
 * upon submit, get text and change page to home
 */
function saveJournalForm(event){
	event.preventDefault();
	var text = event.target.children.journal_text.value

	// todo: save data alongside date/time
	chrome.storage.sync.set({ text });
	//milestone 2: keep track of number of journal entries
	entryCounter();
	changePage("home")	
}

let journal_form = document.getElementById('journal_form')
journal_form.addEventListener('submit', saveJournalForm)


/* increases the counter keeping track of number of jounral entries by 1
*/
function entryCounter(){
	var counter = 0;


	chrome.storage.sync.get('totalEntries', function(result){
			counter = result.totalEntries;
			counter ++;
			console.log("parsed");
			console.log(counter);
			chrome.storage.sync.set({"totalEntries" : counter}, function(){
			});
	});
	
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
				$(wrapper).append('<div class="col-sm-12" style="margin-bottom: 0;"><div class="panel panel-default" id="panel'+ counter +'">' + 
				'<div class="panel-heading" role="tab" id="heading'+ counter +'"><h4 class="panel-title">' +
				'<a class="'+collapsedClass+'" id="panel-lebel'+ counter +'" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse'+ counter +'" ' +
				'aria-expanded="'+ariaExpanded+'" aria-controls="collapse'+ counter +'"> '+catgName+
				'<input  type="range"    id="example_slider" class="slider" min="1" max="100" value="50"><br>'+
				' </a><div class="actions_div" style="position: relative; top: -26px;">' +
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
				'<a class="'+collapsedClass+'" id="panel-lebel'+ counter +'" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse'+ counter+'" ' +
				'aria-expanded="'+ariaExpanded+'" aria-controls="collapse'+ counter+'"> '+catgName+
				'<input  type="range"    id="example_slider" class="slider" min="1" max="100" value="50"><br>'+
				' </a><div class="actions_div" style="position: relative; top: -26px;">' +
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
