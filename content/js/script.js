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
  platformMap: { Win: 'windows', Mac: 'mac', X11: 'linux', Linux: 'linux' },
  ready: {},
  messages: {
    subscribe: {
      success: "Thanks, Sign-Up Successful",
      validation: "Please enter a valid email address",
      processing: "Processing",
      signup: "Sign-Up",
      commError: "An communication error occured",
      done: "Done"
    }
  },
  events: [
    {year: 2011, month: 5, day: 12, title: "WD", lat: 47.561484, lng: -52.712681},
    {year: 2011, month: 5, day: 18, title: "Rails Conf", lat: 47.561484, lng: -52.712681},
    {year: 2011, month: 6, day: 15, title: "Velocity", lat: 47.561484, lng: -52.712681}
  ],
  colors: ['green', 'pink', 'blue', 'orange', 'purple'],
  currentColor: document.body.className
};

(function($,document, window) {
  // run any function on app.ready
  $( document ).ready( function() {
    app.platform = app.detectPlatform();
    $.each( app.ready, function() {
        typeof this === "function" && this.call( app );
    });
  });
  window.app = app;
})( jQuery, document, this );

app.changeColor = function(color) {
  var body = $(document.body);

  body.removeClass(app.currentColor).addClass(color);
  app.currentColor = color;
  document.cookie = 'scColor=' + color;
  console.log(document.cookie);
};

app.carousel = (function() {
  var $carousel = $( '#carousel' ),
      $panels = $carousel.find( '.panel' ),
      $buttons = $carousel.find( 'button' ),
      $tray = $carousel.find( '.tray' ),
      $trayLinks = $tray.find( 'a' ),
      currentPanel;

  var gotoPanel = function( id, force ) {
    var $currentPanel, $oldPanels, $otherPanels;

    if (force === undefined) force = false;

    // cap
    currentPanel = id > $panels.length - 1 ? 0 : id < 0 ? $panels.length -1 : id;

    // active the target panel
    $currentPanel = $panels.eq( currentPanel );
    $currentPanel.addClass( 'active' ).removeClass( 'old' );
    if (!force) { $currentPanel.animate({left: 44, opacity: 1}, 1000); }
    else { $currentPanel.css({left: 44, opacity: 1}); }

    var color = $currentPanel.data('color');
    if (color && app.colors.indexOf(color) > -1) {
      app.changeColor(color);
    }

    // if we're at 0, there is no prior elements to animate
    if ( currentPanel > 0 ) {
      $oldPanels = $panels.slice( 0, currentPanel );
      $oldPanels.addClass( 'old' ).removeClass( 'active' );
      if (!force) { $oldPanels.animate({left: -880, opacity: 0}, 1000); }
      else { $oldPanels.animate({left: -880, opacity: 0}); }
    }

    //make sure any slides ahead of the current one aren't active or old
    $otherPanels = $panels.slice( currentPanel + 1 );
    $otherPanels.removeClass( 'old active' );
    if (!force) { $otherPanels.animate({left: 880, opacity: 0}, 1000); }
    else { $otherPanels.css({left: 880, opacity: 0}); }
    
    //set the tray's panel button thingy to active
    $trayLinks.removeClass( 'active' ).filter( '.panel' + currentPanel ).addClass( 'active' );
  };

  var panel;
  $panels.each(function(index) {
    panel = $(this);
    if (panel.data('color') === app.currentColor) {
      gotoPanel(index, true);
    }
  });

  app.ready.carousel = function() {
    $buttons.click(function(e) {
      e.preventDefault();
      // handle name="previous" and name="next"
      if ( e.target.name ) {
        gotoPanel( currentPanel + ( e.target.name === "previous" ? -1 : 1 ) );
      }
    });
    
    // get all the clicks in the tray
    $tray.click( function(e) {
      e.preventDefault();
      // go to a particular panel
      var match = /panel([0-9]+)/.exec( e.target.className );
      if ( match && typeof match[1] !== "undefined" ) {
        gotoPanel( +match[1] );
      }
    });
  };
})();


app.slider = (function() {
  var $slider, $panels, currentPanel, $tray, $trayLinks,
  gotoPanel = function( id, force ) {
    // cap
    currentPanel = id > $panels.length - 1 ? 0 : id < 0 ? $panels.length -1 : id;

    // active the target panel
    $panels.eq( currentPanel ).addClass( 'active' ).removeClass( 'old' );

    // if we're at 0, there is no prior elements to animate
    if ( currentPanel > 0 ) {
      $panels.slice( 0, currentPanel ).addClass( 'old' ).removeClass( 'active' );
    }

    //make sure any slides ahead of the current one aren't active or old
    $panels.slice( currentPanel + 1 ).removeClass( 'old active' );
    
    //set the tray's panel button thingy to active
    $trayLinks.removeClass( 'active' ).filter( '.panel' + currentPanel ).addClass( 'active' );
  };
  
  app.ready.slider = function() {
    // cache dom elems
    $slider = $( '#application-slider' );
    $tray = $( '#application-slider-tray' );
    $trayLinks = $tray.find( 'a' );
    $panels = $slider.find( '.panel' ); // these are the panels of 4 slides
    
    // get the index of the 'active' panel
    var index = $panels.filter( 'active' ).prevAll().length;
    
    // if there is no active panel, assume the first
    currentPanel = ( index || 1 ) -1;
    
    // get all the clicks in the tray
    $tray.click( function(e) {
      e.preventDefault();
      // handle name="previous" and name="next"
      if ( e.target.name ) {
        gotoPanel( currentPanel + ( e.target.name === "previous" ? -1 : 1 ) );
        return;
      }
      // go to a particular panel
      var match = /panel([0-9]+)/.exec( e.target.className );
      if ( match && typeof match[1] !== "undefined" ) {
        gotoPanel( +match[1] );
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
  $.each( app.platformMap, function(i,v) {
    if ((new RegExp( i )).test( navigator.appVersion ) ) {
      platform = PLATFORM[ v ];
    }
  });
  return platform;
};

/**
  Starts a download of the installer package for the current platform. After
  a short delay, goes to the install page for the current platform.
  
 */
app.startDownload = function(platform) {
  // Download the correct file
  platform = platform || app.platform;
  switch (platform) {
    case PLATFORM.windows:
      window.location.href = "http://installers.sproutcore.com/SproutCore.exe";
      break;
    
    case PLATFORM.mac:
      window.location.href = "http://installers.sproutcore.com/SproutCore.pkg";
      break;
    
    default:
      // Do nothing
  }
  
  setTimeout(function () {
    app.gotoInstall(platform);
  }, 1000);
};

/**
  Goes to the install page for the current platform.
  
 */
app.gotoInstall = function(platform) {
  var url = "docs.html#install";
  
  switch (platform) {
    case PLATFORM.windows:
      url = "install_win";
      break;
    
    case PLATFORM.mac:
      url = "install_mac";
      break;
    
    case PLATFORM.linux:
      url = "install_linux";
      break;
    
    default:
      url = "install";
  }
  
  window.location.href = '/'+url+'/';
};

app.subscribe = (function( $, window ) {
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
              width: $subscribeButton.width() + $subscribeProcessing.width() +  10
            }, { 
              duration:1200
            });
          $subscribeProcessing.fadeIn();
          $subscribeInput.fadeOut();    
          $subscribeButton.html( app.messages.subscribe.processing );    
        },
        
        done:  function( errorMessage, email ) {
          $subscribe.find( '.processing' ).fadeOut();
          $subscribe.animate({ 
              width: width
            }, { 
              duration:1200, 
              complete: function() {
                if ( errorMessage && errorMessage !== "success" ) {
                  $subscribeInput.val( email ).fadeIn();
                  views.error( errorMessage );
                }  else {
                  $subscribeInput.val( app.messages.subscribe.success ).addClass( 'processed' ).fadeIn().attr( 'readonly', true );
                  $subscribeButton.html( app.messages.subscribe.done ).attr( 'disabled', true);
                  processed = true;
                }                      
              }
          });
        },
        
        error: function( errorMessage ) {
          $subscribeError.html( errorMessage ).stop(true, true).fadeIn();
          $subscribeButton.html( app.messages.subscribe.signup );
        }
      },
      
      // all of the actions
      subscribe = function( email ) {
        if ( processed ) {
          return false;
        }

        if ( !email.length || !rEmail.test( email ) ) {
          views.error( app.messages.subscribe.validation );
          return false;
        }
        
        views.processing();
        
        views.done();
        return;
        
        // view.done() for success, view.done( errorMessage, email ) for comm error and orig. email
        $.ajax({
          url: "subscribe.php",
          type: 'post',
          data: { email: email }
        }).done( function( data, success ) {
          if ( success === "success" ) {
            view.done();
          }
        }).fail( function() {
          views.done( app.messages.subscribe.commError, email );
        });
      };
  
  app.ready.subscribe = function() {
    // cache this stuff, ya
    $subscribe = $( '#subscribe' );
    $subscribeButton = $subscribe.find( 'button[name="subscribe"]' );
    $subscribeError = $subscribe.find( '.error' );
    $subscribeInput = $subscribe.find( 'input' );
    $subscribeProcessing = $subscribe.find( '.processing' );

    // event listeners
    $subscribe.bind( 'click keydown submit' , function( e ) {
      $subscribeError.fadeOut();
      if ( e.type === "submit" ) {
        e.preventDefault();
        subscribe( $subscribeInput.val() );
      }
    });
  };
})(jQuery, this);

// add 'ready' to html when the dom's ready to go
app.ready.domReadyClass = function() {
  $( 'html' ).addClass( 'ready' );
};

// Pass search query to results page

function submitQuery() {
  window.location = '/search/#results?q='
      + encodeURIComponent(
          document.getElementById('query-input').value);
  return false;
}

