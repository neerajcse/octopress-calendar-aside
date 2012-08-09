/*
    Calendar aside/plugin for octopress blogging framework.
    Copyright (C) 2012  Neeraj Kumar ( neerajpkumar@gmail.com, neerajkumar@outlook.com)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
// these are labels for the days of the week
cal_days_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// these are human-readable month name labels, in order
cal_months_labels = ['January', 'February', 'March', 'April',
                     'May', 'June', 'July', 'August', 'September',
                     'October', 'November', 'December'];

// these are the days of the week for each month, in order
cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// this is the current date
cal_current_date = new Date(); 

function generateGuid()
{
  var result, i, j;
  result = '';
  for(j=0; j<32; j++) {
    if( j == 8 || j == 12|| j == 16|| j == 20)
    result = result + '-';
    i = Math.floor(Math.random()*16).toString(16).toUpperCase();
    result = result + i;
  }
  return result;
}

function createCalendar(id)
{
	
}

function Calendar(month, year, highlightArray, highlightLinks) {
	this.month = (isNaN(month) || month == null) ? cal_current_date.getMonth() : month;
	this.year  = (isNaN(year) || year == null) ? cal_current_date.getFullYear() : year;
	this.html = '';
	this.guid = '';
	//array of dates which are to be highlighted.
	//Expects the dates in the form MM/DD/YYYY
	this.highlightArray = highlightArray;
	this.highlightLinks = highlightLinks;
}

Calendar.prototype.generateHTML = function(id) {
  if(id == undefined)
  {
    id = generateGuid();
  }
  this.guid = id
  
  // get first day of month
  var firstDay = new Date(this.year, this.month, 1);
  var startingDay = firstDay.getDay();
  
  // find number of days in month
  var monthLength = cal_days_in_month[this.month];
  
  // compensate for leap year
  if (this.month == 1) { // February only!
    if((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0){
      monthLength = 29;
    }
  }
  
  // do the header
  var monthName = cal_months_labels[this.month]
  var prevYear;
  var nextYear;
  var prevMonth;
  var nextMonth;
  if(this.month == 0)
  {
	prevYear = this.year -1;
	nextYear = this.year;
	prevMonth = 11;
	nextMonth = this.month +1;
  }
  else if(this.month == 11)
  {
	prevYear = this.year;
	nextYear = this.year+1;
	prevMonth = this.month -1;
	nextMonth = 1;
  }
  else
  {
	prevYear = this.year;
	nextYear = this.year;
	prevMonth = this.month - 1;
	nextMonth = this.month + 1;
  }
  var html = '<table id="'+id+'-calendar-table" class="calendar-table">';
  html += '<tr><th colspan="7">';
  html += '<a id="'+this.id+'-prev-calendar-link" class="prev-link" style="height:25px;width:25px" href="#" onclick="monthCalendar(\''+this.guid+'\','+prevYear+','+prevMonth+');return false;" ><img class="prevCalendarLink" style="height:25px;width:25px;border:none 0px;padding-top:2px" src="/images/prev.png"></img></a>';
  html +=  monthName + "&nbsp;" + this.year;
  html += '<a id="'+this.id+'-next-calendar-link" class="next-link" style="height:25px;width:25px" href="#" onclick="monthCalendar(\''+this.guid+'\','+nextYear+','+nextMonth+');return false;"><img class="nextCalendarLink"  style="height:25px;width:25px;border:none 0px;padding-top:2px" src="/images/next.png"></img></a>';
  html += '</th></tr>';
  html += '<tr class="calendar-header">';
  for(var i = 0; i <= 6; i++ ){
    html += '<td class="calendar-header-day">';
    html += cal_days_labels[i];
    html += '</td>';
  }
  html += '</tr><tr>';

  // fill in the days
  var day = 1;
  // this loop is for is weeks (rows)
  for (var i = 0; i < 9; i++) {
    // this loop is for weekdays (cells)
    for (var j = 0; j <= 6; j++) {
		var strMonth;
		var strDay;
	  if(day < 10 )
	  {
		strDay = '0'+day;
	  }
	  else
	  {
		strDay = day;
	  }
	  if( (this.month+1) < 10 )
	  {
		strMonth = '0' + (this.month +1);
		
	  }
	  else
	  {
		strMonth = this.month+1;
	  }
	  var date = strMonth+"/"+strDay+"/"+this.year;
	  var isEvent =  this.highlightArray.indexOf(date) > -1;
	  if(isEvent){
		html += '<td><span class="highlighted-calendar-day"><a href="'+this.highlightLinks[this.highlightArray.indexOf(date)]+'">';
	  }else{
		html += '<td><span class="calendar-day">'; 
	  }
	  
      if (day <= monthLength && (i > 0 || j >= startingDay)) {
        html += day;
        day++;
      }
	  if(isEvent)
		html += '</a></span></td>';
	  else
		html += '</span></td>';
	  
    }
    // stop making rows if we've run out of days
    if (day > monthLength) {
      break;
    } else {
      html += '</tr><tr>';
    }
  }
  html += '</tr></table>';
  
  
  this.html = html;
}

Calendar.prototype.getHTML = function() {
  return this.html;
}


