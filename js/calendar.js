//Use to place the notes in an mock user
const userData = {
    notes: [
      {
        title: "Ouch My Back Hurts",
        painScale: 10,
        date: "11/11/2021"
        //Month/Day/FullYear
      },
      {
        title: "Ouch My Back Hurts",
        painScale: 10,
        date: "11/17/2021"
        //Month/Day/FullYear
      },
      {
        title: "Ouch My Back Hurts",
        painScale: 10,
        date: "11/12/2021"
        //Month/Day/FullYear
      }
    ]
  };
  
  _("#calendar").innerHTML = calendar();
  
  // short queySelector
  function _(s) {
    return document.querySelector(s);
  }
  
  // toggle event show or hide
  function hideEvent() {
    _("#calendar_data").classList.toggle("show_data");
  }
  
  // simple calendar
  function calendar() {
    // vars
    var day_of_week = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"),
      month_of_year = new Array(
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ),
      Calendar = new Date(),
      year = Calendar.getUTCFullYear(),
      month = Calendar.getMonth(),
      today = Calendar.getDate(),
      weekday = Calendar.getDay(),
      html = "";
  
    // start in 1 and this month
    Calendar.setDate(1);
    Calendar.setMonth(month);
  
    // template calendar for the header
    html = `<table> 
                <thead>
                    <tr class="head_cal"><th colspan="7">
                        ${month_of_year[month]} 
                    </tr>
                    <tr class="subhead_cal"><th colspan="7">
                    ${Calendar.getFullYear()}
                    </tr>
                </th>
                <tr class="week_cal">
    `
    for (index = 0; index < 7; index++) {
      if (weekday == index) {
        html += `<th class="week_event">${day_of_week[index]} </th>`;
      } else {
        html += `<th>${day_of_week[index]} </th>`;
      }
    }
    html += "</tr> </thead>";

    // body
    html += '<tbody class="days_cal">';
    html += "</tr>";
  
    for (index = 0; index < Calendar.getDay(); index++) {
      html += '<td class="white_cal"> </td>';
    }
    //Generates a day item on the calendar
    for (index = 0; index < 31; index++) {
      if (Calendar.getDate() > index) {
        week_day = Calendar.getDay();
  
        if (week_day === 0) {
          html += "</tr>";
        }
        if (week_day !== 7) {
          // this day
          var day = Calendar.getDate();
          var info = `${month + 1}/${day}/${year}`;
  
          //If there's a note then indicate visually on the calendar with a different background color
          if (today === Calendar.getDate()) {
            html += `<td class="display:flex; flex-direction:col;">
                <a 
                class="today_cal" 
                href="#" data-id="${info}" 
                onclick="alert(${CheckDateForNotes(info)})"
                style='${
                  CheckDateForNotes(info)
                    ? "background-color:#ADF5B8; color:#2D2D2D;"
                    : "background: #ade0ff; color: #fff;"
                }'
                >
                  ${day} 
                </a></td>`;
          } else {
            html += `<td>
                <a 
                href="#" data-id="${info}" 
                onclick="alert(${CheckDateForNotes(info)})"
                style='${
                  CheckDateForNotes(info)
                    ? "background-color:#ADF5B8; color:#2D2D2D;"
                    : ""
                }'
                >
                ${day}</a></td>`;
          }
        }
        if (week_day == 7) {
          html += "</tr>";
        }
      }
  
      Calendar.setDate(Calendar.getDate() + 1);
    } // end for loop
    return html;
  }
  

  function CheckDateForNotes(info) {
    var { notes } = userData;
    var currentDate = new Date(info);
    var hasNote = false;
    var length = 3; //Object.keys(userData.notes).length();
    for (var i = 0; length > i; i++) {
      var tempDate = new Date(notes[i].date);
      if (tempDate.toString() === currentDate.toString()) {
        hasNote = true;
      }
    }
    return hasNote;
  }
  
  
  
  /**TESTING Date Note Checker*/
  /**
   * var Calendar = new Date();
  var year = Calendar.getUTCFullYear();
  var month = Calendar.getMonth();
  var day = Calendar.getDate();
  var weekday = Calendar.getDay();
   */
  //console.log(CheckDateForNotes("11/11/2021")); //true
  //console.log(CheckDateForNotes("11/12/2021")); //true
  //console.log(CheckDateForNotes("11/17/2021")); //true
  //console.log(CheckDateForNotes("11/10/2021")); //false
  //console.log(Object.keys(userData.notes).length); //3