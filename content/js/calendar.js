/*globals app google */

(function($) {

  $.fn.calendar = function(options) {
    var now = new Date();

    var settings = $.extend({
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      onEventSelected: function() {},
      month: now.getMonth(),
      year: now.getYear() + 1900
    },
    options);

    var len = settings.events.length,
    idx, e;

    for (idx = 0; idx < len; idx++) {
      settings.events[idx].id = idx;
    }

    function eventsForMonth(month, year) {
      var all = settings.events,
      len = all.length,
      events = [],
      e;

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
      if (month === 1 && year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
        return 29;
      }

      return daysInMonth[month];
    }

    function renderMonth(month, year) {
      var currentEvents = eventsForMonth(month, year),
      previousMonth = month === 0 ? 11 : month - 1,
      previousYear = previousMonth === 11 ? year - 1 : year,
      previousEvents = eventsForMonth(previousMonth, previousYear),
      nextMonth = month === 11 ? 0 : month + 1,
      nextYear = month === 11 ? year + 1 : year,
      nextEvents = eventsForMonth(nextMonth, nextYear),
      s = '',
      idx,
      len,
      e;

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
          e = previousEvents[previousDays + idx + 1];
          s += '<div class="day other-month last-month' + (e ? ' has-event': '') + '">';
          s += '<span>' + (previousDays + idx + 1) + '</span>';
          if (e) {
            s += '<a href="#" class="event button secondary" id="event-button-' + e.id + '">' + e.title + '</a>';
          }
          s += '</div>';
        }
      }

      // render days for current month
      for (; idx < firstDay + days; idx++) {
        e = currentEvents[idx - firstDay + 1];

        if (idx % 7 === 0) {
          s += '<div class="week">'; // open the week
        }

        s += '<div class="day current-month' + (e ? ' has-event': '') + '">';
        s += '<span>' + (idx - firstDay + 1) + '</span>';
        if (e) {
          s += '<a href="#" class="event button secondary" id="event-button-' + e.id + '">' + e.title + '</a>';
        }
        s += '</div>';

        if (idx % 7 === 6) {
          s += '</div>'; // close the week
        }
      }

      // render days for next month
      var i = 1;
      for (; idx < 42; idx++) {
        e = nextEvents[i];

        if (idx % 7 === 0) {
          s += '<div class="week">'; // open the week
        }

        s += '<div class="day other-month next-month' + (e ? ' has-event': '') + '">';
        s += '<span>' + i + '</span>';
        i++;

        if (e) {
          s += '<a href="#" class="event button secondary" id="event-button-' + e.id + '">' + e.title + '</a>';
        }

        s += '</div>';

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
      eventButtons = monthContainer.find('.event'),
      now = new Date(),
      depth = 10,
      self = this,
      currentMonth,
      currentYear,
      lastEvent;

      function gotoMonth(month, year) {
        var $newMonth = $(renderMonth(month, year)),
        $currentMonth = monthContainer.find('.month');

        if (currentMonth < month || currentYear < year) {
          // next
          $newMonth.css('zIndex', depth);
          $currentMonth.css('zIndex', ++depth);
          $newMonth.appendTo(monthContainer);

          $currentMonth.animate({
            'top': -395,
            opacity: 0
          },
          350,
          function() {
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

          $newMonth.animate({
            'top': 0,
            opacity: 1
          },
          250,
          function() {
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

      function selectEvent(e) {
        $('#event-button-' + e.id).addClass('sel');
        if (lastEvent) {
          $('#event-button-' + lastEvent.id).removeClass('sel');
        }

        settings.onEventSelected.call(self, e);

        lastEvent = e;
      }

      gotoMonth(settings.month, settings.year);

      var startEvents = eventsForMonth(currentMonth, currentYear),
      len = startEvents.length,
      idx,
      e;

      for (idx = 0; idx < len; idx++) {
        e = startEvents[idx];
        if (e) {
          break;
        }
      }

      selectEvent(e);

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

      eventButtons.live('click',
      function(event) {
        var id = event.target.id,
        e;

        if (id) {
          id = id.replace(/event\-button\-/, '');
        }

        event.preventDefault();

        e = settings.events[id];
        if (e) {
          selectEvent(e);
        }
      });
    });

  };

})(jQuery);

app.mapsLoaded = false;

function initialize() {
  var currentEvent = jQuery("#event-info .event.active"),
  e,
  loc;

  if (currentEvent.length > 0) {
    e = app.events[currentEvent[0].id.replace(/event\-/, '')];
    loc = new google.maps.LatLng(e.lat, e.lng);

    var googleMap = new google.maps.Map(currentEvent.find('.map')[0], {
      zoom: 16,
      center: loc,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var marker = new google.maps.Marker({
      position: loc,
      title: "Venue"
    });
    marker.setMap(googleMap);
  }

  app.mapsLoaded = true;
}

jQuery(document).ready(function() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://maps.google.com/maps/api/js?sensor=false&callback=initialize";
  document.body.appendChild(script);

  var info = $('#event-info');

  $('#calendar').calendar({
    events: app.events,
    onEventSelected: function(e) {
      var currentEvent = info.find('.event.active'),
      newEvent = info.find('#event-' + e.id),
      map = newEvent.find('.map')[0];

      if (newEvent.hasClass('active')) {
        return;
      }

      if (currentEvent.length > 0) {
        currentEvent.removeClass('active').animate({
          left: -435,
          opacity: 0
        },
        350);
        newEvent.animate({
          left: 0,
          opacity: 1
        },
        350).addClass('active');
      } else {
        newEvent.css({
          left: 0,
          opacity: 1
        }).addClass('active');
      }

      if (app.mapsLoaded) {
        var loc = new google.maps.LatLng(e.lat, e.lng);

        var googleMap = new google.maps.Map(map, {
          zoom: 16,
          center: loc,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var marker = new google.maps.Marker({
          position: loc,
          title: "Venue"
        });
        marker.setMap(googleMap);
      }
    }
  });
});