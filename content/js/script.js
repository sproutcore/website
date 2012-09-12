// Enum like object for identifying platforms
var PLATFORM = {
  windows: 'win',
  mac: 'mac',
  linux: 'linux',
  unknown: 'unknown'
};

// basic app object
var app = {
  platform: 'unknown',
  platformMap: {
    Win: 'windows',
    Mac: 'mac',
    X11: 'linux',
    Linux: 'linux'
  },
  ready: {},
  messages: {
    subscribe: {
      success: "Thanks, Sign Up Successful",
      validation: "Please enter a valid email address",
      processing: "Processing",
      signup: "Sign Up",
      commError: "An communication error occured",
      done: ""
    }
  },
  events: [
    {year: 2011, month: 1, day: 26, title: "Facebook", lat: 37.419677, lng: -122.146119},
    {year: 2011, month: 1, day: 27, title: "Day of JS", lat: 37.422756, lng: -122.083501},
    {year: 2011, month: 3, day: 21, title: "DevNexus", lat: 33.927978, lng: -84.451218},
    {year: 2011, month: 4, day: 16, title: "jQuery Conf", lat: 37.413168, lng: -122.0713},
    {year: 2011, month: 4, day: 27, title: "Philly ETE", lat: 39.946274, lng: -75.144162},
    {year: 2011, month: 4, day: 28, title: "jQuery Boston", lat: 42.350209, lng: -71.048281},
    {year: 2011, month: 4, day: 30, title: "BarCamp", lat: 27.341761, lng: -82.549151},
    {year: 2011, month: 5, day: 11, title: "JS Day Italy", lat: 45.443753, lng: 10.971866},
    {year: 2011, month: 5, day: 12, title: "WD", lat: 47.612196, lng: -122.332227},
    {year: 2011, month: 5, day: 18, title: "Rails Conf", lat: 39.284963, lng: -76.616871},
    {year: 2011, month: 5, day: 19, title: "Budapest.rb", lat: 47.498416, lng: 19.04068},
    {year: 2011, month: 6, day: 15, title: "Velocity", lat: 37.405517, lng: -121.974828},
    {year: 2011, month: 7, day: 9, title: "GothamJS", lat: 40.770416, lng: -73.982265},
    {year: 2011, month: 7, day: 27, title: "OSCON", lat: 45.528246, lng: -122.661645},
    {year: 2011, month: 7, day: 29, title: "re:build", lat: 39.787955, lng: -86.153482},
    {year: 2011, month: 8, day: 30, title: "MobileJS Summit"},
    {year: 2011, month: 9, day: 19, title: "Strange Loop", lat: 38.625301, lng: -90.190408},
    {year: 2011, month: 10, day: 8, title: "Code Camp", lat: 37.36093, lng: -122.127},
    {year: 2011, month: 7, day: 12, title: "SF Meetup", lat: 37.786139, lng: -122.402621},
    {year: 2011, month: 7, day: 26, title: "Van Meetup", lat: 49.284182, lng: -123.091224},
    {year: 2011, month: 8, day: 17, title: "SF Meetup", lat: 37.376003, lng: -122.034185}
  ],
  colors: ['green', 'pink', 'blue', 'orange', 'purple'],
  currentColor: document.body.className
};

(function($, document, window) {
  // run any function on app.ready
  $(document).ready(function() {
    app.platform = app.detectPlatform();
    $.each(app.ready,
    function() {
      typeof this === "function" && this.call(app);
    });
  });
  window.app = app;
})(jQuery, document, this);

// add 'ready' to html when the dom's ready to go
app.ready.domReadyClass = function() {
  var html = $('html');
  if (!$.cookie('scVisited')) {
    html.addClass('firstTime');
    $.cookie('scVisited', true);
  }
  html.addClass('ready');
};

app.changeColor = function(color) {
  $(document.body).
    removeClass(app.currentColor).
    addClass(color);
  app.currentColor = color;
  $.cookie('scColor', color);
};

app.carousel = (function() {
  var $carousel = $('#carousel'),
  $panels = $carousel.find('.panel'),
  $buttons = $carousel.find('button'),
  $tray = $carousel.find('.tray'),
  $trayLinks = $tray.find('a'),
  currentPanel = 0;

  var gotoPanel = function(id, force) {
    var $currentPanel, $oldPanels, $otherPanels;

    if (force === undefined) force = false;
    if (navigator.appVersion.match(/iPad/)) {
      force = true;
    }

    // cap
    currentPanel = id > $panels.length - 1 ? 0 : id < 0 ? $panels.length - 1 : id;

    if (force) {
      $panels.removeClass('animate');
    } else {
      $panels.addClass('animate');
    }

    // active the target panel
    $currentPanel = $panels.eq(currentPanel);
    $currentPanel.addClass('active').removeClass('old');

    var color = $currentPanel.data('color');
    if (color && app.colors.indexOf(color) > -1) {
      app.changeColor(color);
    }

    // if we're at 0, there is no prior elements to animate
    if (currentPanel > 0) {
      $oldPanels = $panels.slice(0, currentPanel);
      $oldPanels.addClass('old').removeClass('active');
    }

    //make sure any slides ahead of the current one aren't active
    $otherPanels = $panels.slice(currentPanel + 1);
    $otherPanels.removeClass('active');
    //place old on future panels for smooth transition when scrolling the carousel backwards
    $otherPanels = $panels.slice(currentPanel + 1);
    $otherPanels.addClass('old');

    //set the tray's panel button thingy to active
    $trayLinks.removeClass('active').filter('.panel' + currentPanel).addClass('active');
  };

  var panel;
  $panels.each(function(index) {
    panel = $(this);
    if (panel.data('color') === app.currentColor) {
      currentPanel = index;
    }
  });

  gotoPanel(currentPanel, true);

  app.ready.carousel = function() {
    $buttons.click(function(e) {
      e.preventDefault();
      // handle name="previous" and name="next"
      if (e.target.name) {
        gotoPanel(currentPanel + (e.target.name === "previous" ? -1 : 1));
      }
    });

    // get all the clicks in the tray
    $tray.click(function(e) {
      e.preventDefault();
      // go to a particular panel
      var match = /panel([0-9]+)/.exec(e.target.className);
      if (match && typeof match[1] !== "undefined") {
        gotoPanel( + match[1]);
      }
    });
  };
})();

app.slider = (function() {
  var $slider, $panels, currentPanel, $tray, $trayLinks, gotoPanel = function(id, force) {
    // cap
    currentPanel = id > $panels.length - 1 ? 0 : id < 0 ? $panels.length - 1 : id;

    // active the target panel
    $panels.eq(currentPanel).addClass('active').removeClass('old');

    // if we're at 0, there is no prior elements to animate
    if (currentPanel > 0) {
      $panels.slice(0, currentPanel).addClass('old').removeClass('active');
    }

    //make sure any slides ahead of the current one aren't active or old
    $panels.slice(currentPanel + 1).removeClass('old active');

    //set the tray's panel button thingy to active
    $trayLinks.removeClass('active').filter('.panel' + currentPanel).addClass('active');
  };

  app.ready.slider = function() {
    // cache dom elems
    $slider = $('#application-slider');
    $tray = $('#application-slider-tray');
    $trayLinks = $tray.find('a');
    $panels = $slider.find('.panel'); // these are the panels of 4 slides
    // get the index of the 'active' panel
    var index = $panels.filter('active').prevAll().length;

    // if there is no active panel, assume the first
    currentPanel = (index || 1) - 1;

    // get all the clicks in the tray
    $tray.click(function(e) {
      e.preventDefault();
      // handle name="previous" and name="next"
      if (e.target.name) {
        gotoPanel(currentPanel + (e.target.name === "previous" ? -1 : 1));
        return;
      }
      // go to a particular panel
      var match = /panel([0-9]+)/.exec(e.target.className);
      if (match && typeof match[1] !== "undefined") {
        gotoPanel( + match[1]);
      }
    });
  };
})();

/**
  Detects the current platform.

  @returns {app.PLATFORM}
*/
app.detectPlatform = function() {
  // This probably sucks and is unreliable
  var platform = PLATFORM.unknown;
  $.each(app.platformMap,
  function(i, v) {
    if ((new RegExp(i)).test(navigator.appVersion)) {
      platform = PLATFORM[v];
    }
  });

  if (navigator.appVersion.match(/iPad|iPhone|Android/)) {
    $('html').addClass('mobile');
  }

  return platform;
};

/**
  Goes to the install page for the current platform.

 */
app.gotoInstall = function(platform, alwaysRedirect) {
  if (alwaysRedirect === undefined) {
    alwaysRedirect = true;
  }

  platform = platform || app.platform;
  switch (platform) {
  case PLATFORM.windows:
    window.location.href = "http://sproutcore.com/install_win/";
    break;

  case PLATFORM.mac:
    window.location.href = "http://sproutcore.com/install_mac/";
    break;

  case PLATFORM.linux:
    window.location.href = "http://sproutcore.com/install_linux/";
    break;

  default:
    if (alwaysRedirect) {
      window.location.href = "http://sproutcore.com/install/";
    }
  }
};

app.subscribe = (function($, window) {
  // dom elements
  var $subscribe, $subscribeButton, $subscribeInput, $subscribeError, $subscribeProcessing,

  // email regex from jquery-validate
  rEmail = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,

  // prevent double submissions
  processed = false,

  // old width of the container
  width,

  // handles all rendering of text, animations, etc
  views = {

    processing: function() {
      width = width || $subscribe.width();
      $subscribe.animate({
        width: $subscribeButton.width() + $subscribeProcessing.width() + 10
      },
      {
        duration: 1200
      });
      $subscribeProcessing.fadeIn();
      $subscribeInput.fadeOut();
      $subscribeButton.html(app.messages.subscribe.processing);
    },

    done: function(errorMessage, email) {
      $subscribe.find('.processing').fadeOut();
      $subscribe.animate({
        width: width
      },
      {
        duration: 1200,
        complete: function() {
          if (errorMessage && errorMessage !== "success") {
            $subscribeInput.val(email).fadeIn();
            views.error(errorMessage);
          } else {
            $subscribeInput.val(app.messages.subscribe.success).addClass('processed').fadeIn().attr('readonly', true);
            $subscribeButton.html(app.messages.subscribe.done).attr('disabled', true);
            processed = true;
          }
        }
      });
    },

    error: function(errorMessage) {
      $subscribeError.html(errorMessage).stop(true, true).fadeIn();
      $subscribeButton.html(app.messages.subscribe.signup);
    }
  },

  // all of the actions
  subscribe = function(email) {
    if (processed) {
      return false;
    }

    if (!email.length || !rEmail.test(email)) {
      views.error(app.messages.subscribe.validation);
      return false;
    }

    views.processing();

    views.done();
    return;

    // view.done() for success, view.done( errorMessage, email ) for comm error and orig. email
    $.ajax({
      url: "subscribe.php",
      type: 'post',
      data: {
        email: email
      }
    }).done(function(data, success) {
      if (success === "success") {
        view.done();
      }
    }).fail(function() {
      views.done(app.messages.subscribe.commError, email);
    });
  };

  app.ready.subscribe = function() {
    // cache this stuff, ya
    $subscribe = $('#subscribe');
    $subscribeButton = $subscribe.find('button[name="subscribe"]');
    $subscribeError = $subscribe.find('.error');
    $subscribeInput = $subscribe.find('input');
    $subscribeProcessing = $subscribe.find('.processing');

    // event listeners
    $subscribe.bind('click keydown submit',
    function(e) {
      $subscribeError.fadeOut();
      if (e.type === "submit") {
        e.preventDefault();
        subscribe($subscribeInput.val());
      }
    });
  };
})(jQuery, this);

// Pass search query to results page
function submitQuery() {
  window.location = '/search/?q=' + encodeURIComponent(
  document.getElementById('query-input').value);
  return false;
}

// Show/hide search clear button
app.ready.clearSearch = function() {
  $('[role="search"] input[type="text"]').keyup(function() {
    if ($(this).val() === "") {
      $('[role="search"] input[type="reset"]').hide();
    } else {
      $('[role="search"] input[type="reset"]').show();
    }
  });

  $('[role="search"] input[type="reset"]').click(function() {
    $('[role="search"] input[type="text"]').focus();
    $(this).hide();
  });
};

// Doubts
(function() {
  var trigger = [68, 79, 85, 66, 84, 83],
  current = 0,
  timer;

  function startDoubts() {
    var body = $(document.body);
    var elems = ["<div class='tom'></div>", "<div class='funnyz'>I HAS DOUBTS</div>", "<div class='funnyz'>C/D?</div>", "<div class='funnyz'>Señor</div>"];

    setInterval(function() {
      var r = Math.floor(Math.random() * elems.length);
      $(elems[r]).css({
        position: 'absolute',
        top: body.height() * Math.random(),
        left: body.width() * Math.random(),
        webkitTransform: "rotate(" + (Math.random() * 360) + "deg) scale(" + (Math.random() * 1.5) + ")"
      }).appendTo(body);
    },
    1000);
  }

  function clear() {
    current = 0;
  }

  document.addEventListener('keydown',
  function(e) {
    if (timer) {
      clearTimeout(timer);
    }

    if (trigger[current] === e.which) {
      current++;
      if (current === trigger.length) {
        // success
        startDoubts();
      }
    } else {
      timer = setTimeout(clear, 1000);
    }
  });
})();