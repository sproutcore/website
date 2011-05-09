/*globals app */

(function($) {

  $.fn.calendar = function(options) {
    var now = new Date();

    var settings = $.extend({
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      onEventSelected: function() {},
      month: now.getMonth(),
      year: now.getYear() + 1900
    }, options);

    function eventsForMonth(month, year) {
      var all = settings.events,
          len = all.length,
          events = [], e;

      month++; // months are 0-based, events are 1-based

      for (var idx = 0; idx < len; idx++) {
        e = all[idx];
        if (e.month === month && e.year === year) {
          events[e.day] = e;
        }
      }

      return events;
    }

    function getDaysInMonth(month, year) {
      var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      // leap years
      if (month === 1 && year % 4 === 0 && (year % 100 !==0 || year % 400 ===0)) {
        return 29;
      }

      return daysInMonth[month];
    }

    function renderMonth(month, year) {
      var events = eventsForMonth(month, year),
          previousMonth = month === 0 ? 11 : month - 1,
          previousYear = previousMonth === 11 ? year - 1 : year,
          s = '', idx, len, e;

      s += '<div class="month">';

      // render day names
      s += '<div class="day-names">';
      len = settings.dayNames.length;
      for (idx = 0; idx < len; idx++) {
        s += '<div class="day-name">' + settings.dayNames[idx] + '</div>';
      }
      s += '</div>';

      var days = getDaysInMonth(month, year),
          firstDate = new Date(year, month, 1),
          firstDay = firstDate.getDay(),
          previousDays = getDaysInMonth(previousMonth, previousYear);

      // note that if firstDay === 0, ie a Sunday, then no days from the
      // past month will be rendered

      idx = 0;

      // render days for last month
      if (firstDay > 0) {
        s += '<div class="week">';
        previousDays -= firstDay; // start of days from last month to display
        for (idx = 0; idx < firstDay; idx++) {
          s += '<div class="day other-month last-month"><span>' + (previousDays + idx + 1) + '</span></div>';
        }
      }

      // render days for current month
      for (; idx < firstDay + days; idx++) {
        e = events[idx - firstDay + 1];

        if (idx % 7 === 0) {
          s += '<div class="week">'; // open the week
        }

        s += '<div class="day current-month' + (e ? ' has-event' : '') + '">';
        s += '<span>' + (idx - firstDay + 1) + '</span>';
        if (e) {
          s +=  '<a href="#" class="event button secondary">' + e.title + '</a>';
        }
        s += '</div>';

        if (idx % 7 === 6) {
          s += '</div>'; // close the week
        }
      }

      // render days for next month
      var i = 1;
      for (; idx < 42; idx++) {
        if (idx % 7 === 0) {
          s += '<div class="week">'; // open the week
        }

        s += '<div class="day other-month next-month"><span>' + i + '</span></div>';
        i++;

        if (idx % 7 === 6) {
          s += '</div>'; // close the week
        }
      }

      s += '</div>'; // close the final week
      s += '</div>'; // close the calendar-month

      return s;
    }

    return this.each(function() {
      var calendar = $(this),
          monthContainer = calendar.find('.month-container'),
          monthHeader = calendar.find('.month-nav .month-name'),
          buttons = calendar.find('.month-nav button'),
          now = new Date(),
          depth = 10,
          currentMonth, currentYear;

      function gotoMonth(month, year) {
        var $newMonth = $(renderMonth(month, year)),
            $currentMonth = monthContainer.find('.month');

        if (currentMonth < month || currentYear < year) {
          // next
          $newMonth.css('zIndex', depth);
          $currentMonth.css('zIndex', ++depth);
          $newMonth.appendTo(monthContainer);

          $currentMonth.animate({'top': -395, opacity: 0}, 500, function() {
            $currentMonth.remove();
            depth--;
          });
        } else if (currentMonth > month || currentYear > year) {
          // previous
          $currentMonth.css('zIndex', depth);
          $newMonth.css({
            zIndex: ++depth,
            top: -395
          });
          $newMonth.appendTo(monthContainer);

          $newMonth.animate({'top': 0, opacity: 1}, 500, function() {
            $currentMonth.remove();
            depth--;
          });
        } else {
          // initial render
          $newMonth.appendTo(monthContainer);
        }

        monthHeader.text(settings.monthNames[month] + ' ' + year);

        currentMonth = month;
        currentYear = year;
      }

      gotoMonth(settings.month, settings.year);

      buttons.click(function(e) {
        var month, year;

        e.preventDefault();

        if (e.target.name === "previous") {
          month = currentMonth - 1;
          year = currentYear;

          if (month === -1) {
            month = 11;
            year--;
          }

          gotoMonth(month, year);
        } else if (e.target.name === "next") {
          month = currentMonth + 1;
          year = currentYear;

          if (month === 12) {
            month = 0;
            year++;
          }

          gotoMonth(month, year);
        }
      });
    });

  };

})(jQuery);

jQuery(document).ready(function() {
  $('#calendar').calendar({
    events: app.events,
    onEventSelected: function() {
      
    }
  });
});
